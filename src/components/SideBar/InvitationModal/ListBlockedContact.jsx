import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsUserBlockedContactsLoaded, selectUserBlockedContacts } from '../../../store/selectors/userSelectors';
import LoadingComponent from '../../Buttons/LoadingComponent';
import HandleModalContact from '../../ModalContact/HandleModalContact';
import useOpenConversation from '../../../hooks/useOpenConversation';

const ListBlockedContacts = () => {
	const blockedContacts = useSelector(selectUserBlockedContacts);
	const isUserBlockedContactsLoaded = useSelector(selectIsUserBlockedContactsLoaded);

	const openConversation = useOpenConversation();

	const [userBlockedContacts, setUserBlockedContacts] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [selectedBlockedContact, setSelectedBlockedContact] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = async () => {
		setIsModalOpen(false);
	};

    const handleUnblockContact = async (e, contactId) => {};

	useEffect(() => {
		if (!isUserBlockedContactsLoaded) setIsLoading(true);
		else setIsLoading(false);
	}, [isUserBlockedContactsLoaded]);

	useEffect(() => {
		if (blockedContacts) setUserBlockedContacts(blockedContacts);
	}, [blockedContacts]);

	return (
		<div className="coworkers-container dashboard-card">
			<div className="flex justify-between">
				<h4 className="pl-2">Contacts</h4> 
			</div>
			{isLoading ? (
				<LoadingComponent />
			) : 
				<div className="flex flex-col justify-center">
					{userBlockedContacts && userBlockedContacts.length > 0 ? (
						<ul>
							{userBlockedContacts.map((contact) => (
								<li className='blocked' key={contact.id}>
									<div
										className="flex items-center justify-start p-1 md:p-2 py-2.5 relative transition duration-100 ease-in-out"
										key={contact.id}>
										<div className="flex h-8 items-center ellipsis cursor-pointer" onClick={(e) => {
												e.stopPropagation();
												openModal(e);
												setSelectedBlockedContact(contact)
											}}>
											<div className="mr-2 md:mr-3 text-dark-blue text-sm sm:text-base md:text-lg">
												<i className="fa-solid fa-user"></i>
											</div>
											<div className="flex items-center">
												<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full text-left w-8">
													<span className="avatarLetterAssigned">
														{contact?.username?.[0]}
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
									<button className='mr-3 relative h-4 group text-lg' onClick={(e) => handleUnblockContact(e, contact.id)}>
                                        // UNBLOCK BUTTON
										<i className="fa-solid fa-circle-plus block absolute top-0 right-0 group-hover:hidden transition-opacity duration-300 ease-in-out"></i>
										<i className="fa-solid fa-plus hidden absolute top-0 right-0 group-hover:block transition-opacity duration-300 ease-in-out"></i>
									</button>						
								</li>
							))}
						</ul>
					) : (
						<div className="flex flex-col justify-center items-center h-4/6">
							<p className="text-base">
								Aucun contact bloqué
							</p>
						</div>
					)}
				</div>
			}

            {isModalOpen && (
				<HandleModalContact closeModal={closeModal} selectedContact={selectedBlockedContact} />
			)}	
		</div>
	);
};

export default ListBlockedContacts;
