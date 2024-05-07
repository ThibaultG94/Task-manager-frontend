import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsUserContactsLoaded, selectUserContacts } from '../../../store/selectors/userSelectors';
import { useGetSentOutInvitations } from '../../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../../api/invitations/useGetReceivedInvitations';
import InviteMemberModal from '../../SideBar/InvitationModal/InviteMemberModal';
import LoadingComponent from '../../Buttons/LoadingComponent';
import WorkspaceInviteModal from '../../ModalWorkspace/WorkspaceInviteModal';

const ListContacts = ({ userId }) => {
	const contacts = useSelector(selectUserContacts);
	const isUserContactsLoaded = useSelector(selectIsUserContactsLoaded);

	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();

	const [userContacts, setUserContacts] = useState();
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
	const [selectedContactId, setSelectedContactId] = useState(null);

    const openInviteModal = (event, contactId) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        setSelectedContactId(contactId);
        setModalPosition({ x: rect.x + rect.width, y: rect.y });
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
								<li className='flex justify-between items-center' key={contact.id}>		
									<div
										className="flex items-center justify-start p-1 md:p-2 py-2.5 relative transition duration-100 ease-in-out"
										key={contact.id}>
										<div className="flex h-8 items-center ellipsis">
											<div className="mr-2 md:mr-3 text-dark-blue text-sm sm:text-base md:text-lg">
												<i className="fa-solid fa-user"></i>{' '}
											</div>
											<div className="flex items-center">
												<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8">
													<span id="avatarLetterAssigned">
														{contact.username[0]}
													</span>
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
									<button className='mr-3' onClick={(e) => openInviteModal(e, contact.id)}>
										<i className="fa-solid fa-circle-plus"></i>
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
		</div>
	);
};

export default ListContacts;
