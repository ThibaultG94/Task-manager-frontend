import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserContacts } from '../../store/selectors/userSelectors';
import { useGetSentOutInvitations } from '../../api/invitations/getSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/getReceivedInvitations';
import InviteMemberModal from '../invitation/InviteMemberModal';

const Contacts = ({ userId }) => {
	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const contacts = useSelector(selectUserContacts);
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
			<div className="h-4/5 flex flex-col justify-center items-center">
				{userContacts && userContacts.length > 0 ? (
					<ul>
						{userContacts.map((contact) => (
							<li key={contact.id} className="text-lg my-2">
								<span>{contact.username}</span>
								<span> </span>
								<span>({contact.email})</span>
							</li>
						))}
					</ul>
				) : (
					<div className="flex flex-col justify-center items-center">
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
				/>
			)}
		</div>
	);
};

export default Contacts;
