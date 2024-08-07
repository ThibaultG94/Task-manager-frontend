import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsUserContactsLoaded, selectUserContacts } from '../../../store/selectors/userSelectors';
import { useGetSentOutInvitations } from '../../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../../api/invitations/useGetReceivedInvitations';
import InviteMemberModal from '../../SideBar/InvitationModal/InviteMemberModal';
import LoadingComponent from '../../Buttons/LoadingComponent';
import WorkspaceInviteModal from '../../ModalWorkspace/WorkspaceInviteModal';
import HandleModalContact from '../../ModalContact/HandleModalContact';
import useOpenConversation from '../../../hooks/useOpenConversation';
import AvatarContact from '../../Cloudinary/AvatarContact';

const ListContacts = ({ userId }) => {
	const contacts = useSelector(selectUserContacts);
	const isUserContactsLoaded = useSelector(selectIsUserContactsLoaded);

	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const openConversation = useOpenConversation();

	const [userContacts, setUserContacts] = useState();
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
	const [selectedContactId, setSelectedContactId] = useState(null);
	const [selectedContact, setSelectedContact] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = async () => {
		setIsModalOpen(false);
	};

    const openInviteModal = (event, contactId) => {
		event.stopPropagation();
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const availableWidth = window.innerWidth - rect.right;
        
		const adjustedX = availableWidth < 350 ? rect.left - availableWidth : rect.right;
		const adjustedY = availableWidth < 350 ? rect.top - 50 : rect.top - 115;
        
        setSelectedContactId(contactId);
        setModalPosition({ x: adjustedX, y: adjustedY });
        setIsInviteModalOpen(true);
    };

	useEffect(() => {
		if (!isUserContactsLoaded) setIsLoading(true);
		else setIsLoading(false);
	}, [isUserContactsLoaded]);

	useEffect(() => {
		if (contacts) setUserContacts(contacts);
	}, [contacts]);

	useEffect(() => {
		if (userId) {
			getSentOutInvitations(userId);
			getReceivedInvitations(userId);
		}
	}, [isInvitationModalOpen]);

	return (
		<div className="coworkers-container dashboard-card">
			<div className="flex justify-between">
				<h4 className="pl-2">Contacts</h4>
			</div>
			{isLoading ? (
				<LoadingComponent />
			) : 
				<div className="flex flex-col justify-center">
					{userContacts && userContacts.length > 0 ? (
						<ul>
							{userContacts.map((contact) => (
								<li className='contact' key={contact.id + 45554} onClick={(e) => openConversation(e, contact)}>		
									<div
										className="flex items-center justify-start p-1 md:p-2 py-2.5 relative transition duration-100 ease-in-out"
										key={contact.id}>
										<div className="flex h-9 items-center ellipsis cursor-pointer" onClick={(e) => {
												e.stopPropagation();
												openModal(e);
												setSelectedContact(contact)
											}}>
											<div className="mr-2 md:mr-3 text-dark-blue text-sm sm:text-base md:text-lg">
												<i className="fa-solid fa-user"></i>
											</div>
											<div className="flex items-center">
												<div className="bg-dark-blue-2 flex h-9 items-center justify-center overflow-hidden relative rounded-full text-left w-9">
													<AvatarContact user={contact} />
												</div>
											</div>
											<div className="text-sm md:text-base ml-2 ellipsis">
												<span className="mr-1">
													{contact.username}
												</span>
												<span className="italic opacity-50">
													({contact.email})
												</span>
											</div>
										</div>
									</div>
									<button className='mr-3 relative h-4 group text-lg' onClick={(e) => openInviteModal(e, contact.id)}>
										<i className="fa-solid fa-circle-plus block absolute top-0 right-0 group-hover:hidden transition-opacity duration-300 ease-in-out"></i>
										<i className="fa-solid fa-plus hidden absolute top-0 right-0 group-hover:block transition-opacity duration-300 ease-in-out"></i>
									</button>						
								</li>
							))}
						</ul>
					) : (
						<div className="flex flex-col justify-center items-center h-4/6">
							<p className="text-base">
								Vous n'avez pas encore de contact
							</p>
						</div>
					)}
				</div>
			}

			{isInvitationModalOpen && (
				<InviteMemberModal
					userId={userId}
					setIsInvitationModalOpen={setIsInvitationModalOpen}
					tab={'tab2'}
				/>
			)}

			{isInviteModalOpen && (
                <WorkspaceInviteModal
                    contactId={selectedContactId}
                    closeModal={() => setIsInviteModalOpen(false)}
					position={modalPosition}
					userContacts={userContacts}
                />
            )}

{			isModalOpen && (
				<HandleModalContact closeModal={closeModal} selectedContact={selectedContact} />
			)}	
		</div>
	);
};

export default ListContacts;
