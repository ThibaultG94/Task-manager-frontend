import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserContacts } from '../../store/selectors/userSelectors';
import { useGetSentOutInvitations } from '../../api/invitations/useGetSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/useGetReceivedInvitations';
import InviteMemberModal from '../SideBar/InvitationModal/InviteMemberModal';

const Contacts = ({ userId }) => {
	const contacts = useSelector(selectUserContacts);

	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();

	const [userContacts, setUserContacts] = useState();
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

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
			<h4 className="pl-2">Contacts</h4>
			<div className="flex flex-col justify-center">
				{userContacts && userContacts.length > 0 ? (
					<ul>
						{userContacts.map((contact) => (
							<li
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
							</li>
						))}
					</ul>
				) : (
					<div className="flex flex-col justify-center items-center mt-6">
						<p className="text-base">
							Vous n'avez pas encore de contact
						</p>
						<button
							className="mt-4 py-2 px-3 bg-dark-blue-2 hover:bg-dark-blue text-white font-bold rounded"
							onClick={() => setIsInvitationModalOpen(true)}>
							Ajouter des contacts
							<span className="ml-2">
								<i className="fa-solid fa-user-plus"></i>
							</span>
						</button>
					</div>
				)}
			</div>

			{isInvitationModalOpen && (
				<InviteMemberModal
					userId={userId}
					setIsInvitationModalOpen={setIsInvitationModalOpen}
					tab={'tab1'}
				/>
			)}
		</div>
	);
};

export default Contacts;
