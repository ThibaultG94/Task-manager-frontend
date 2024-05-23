import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserContactsLoaded, selectUserContacts } from '../../store/selectors/userSelectors';
import { selectConversationWindows } from '../../store/selectors/conversationWindowsSelectors';
import { minimizeWindow, openWindow } from '../../store/feature/conversationWindows.slice';
import { useGetSentOutInvitations } from '../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/useGetReceivedInvitations';
import InviteMemberModal from '../SideBar/InvitationModal/InviteMemberModal';
import LoadingComponent from '../Buttons/LoadingComponent';
import WorkspaceInviteModal from '../ModalWorkspace/WorkspaceInviteModal';
import HandleModalContact from '../ModalContact/HandleModalContact';

const Contacts = ({ userId }) => {
	const dispatch = useDispatch();
	const contacts = useSelector(selectUserContacts);
	const isUserContactsLoaded = useSelector(selectIsUserContactsLoaded);
	const conversationWindows = useSelector(selectConversationWindows);

	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();

	const [userContacts, setUserContacts] = useState();
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedContactId, setSelectedContactId] = useState(null);
	const [selectedContact, setSelectedContact] = useState(null);
	const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
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
        setSelectedContactId(contactId);
        setModalPosition({ x: rect.x + rect.width, y: rect.y });
        setIsInviteModalOpen(true);
    };

	const openConversation = (e, contact) => {
        e.stopPropagation();
        const existingWindow = conversationWindows.find(window => window.contact.id === contact.id);
        if (existingWindow) {
            if (existingWindow.isMinimized) {
                dispatch(minimizeWindow({ contactId: contact.id }));
            } else {
                dispatch(minimizeWindow({ contactId: contact.id }));
            }
        } else {
            dispatch(openWindow({ contact }));
        }
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
		<div className="coworkers-container dashboard-card relative">
			<div className="flex justify-between">
				<h4 className="pl-2">Contacts</h4>
				<div
				className='cursor-pointer text-xl pr-2'
				onClick={() => setIsInvitationModalOpen(true)}>
					<i className="fa-solid fa-user-plus"></i>
				</div>
			</div>
			{isLoading ? (
				<LoadingComponent />
			) : 
				<div className="flex flex-col justify-center">
					{userContacts && userContacts.length > 0 ? (
						<ul>
							{userContacts.slice(0, 4).map((contact) => (
								<li className='contact' key={contact.id} onClick={(e) => {
									openModal(e);
									setSelectedContact(contact)
								}}>		
									<div
										className="flex items-center justify-start p-1 md:p-1.5 relative transition duration-100 ease-in-out"
										key={contact.id}>
										<div className="flex h-8 items-center ellipsis">
											<div className="mr-2 md:mr-3 text-dark-blue text-sm sm:text-base md:text-lg">
												<i className="fa-solid fa-user"></i>
											</div>
											<div className="flex items-center">
												<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8">
													<span className="avatarLetterAssigned">
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
									<div className='flex justify-between items-center'>
										<button className='mr-10 relative h-4 group text-lg' onClick={(e) => openConversation(e, contact)}>
											<i className="fa-solid fa-paper-plane block absolute z-50 top-0 right-0 group-hover:hidden transition-opacity duration-300 ease-in-out"></i>
											<i className="fa-regular fa-paper-plane hidden absolute z-50 top-0 right-0 group-hover:block transition-opacity duration-300 ease-in-out"></i>
										</button>
										<button className='mr-3 relative h-4 group text-lg' onClick={(e) => openInviteModal(e, contact.id)}>
											<i className="fa-solid fa-circle-plus block absolute z-50 top-0 right-0 group-hover:hidden transition-opacity duration-300 ease-in-out"></i>
											<i className="fa-solid fa-plus hidden absolute z-50 top-0 right-0 group-hover:block transition-opacity duration-300 ease-in-out"></i>
										</button>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className="no-urgent-tasks">
							Vous n'avez pas encore de contact
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

			{isModalOpen && (
				<HandleModalContact closeModal={closeModal} selectedContact={selectedContact} />
			)}
		</div>
	);
};

export default Contacts;
