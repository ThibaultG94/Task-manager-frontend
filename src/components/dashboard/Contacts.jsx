import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';
import { useGetSentOutInvitations } from '../../api/invitations/getSentOutInvitations';
import { useGetReceivedInvitations } from '../../api/invitations/getReceivedInvitations';
import InviteMemberModal from '../invitation/InviteMemberModal';

const Contacts = ({ userId }) => {
	const getSentOutInvitations = useGetSentOutInvitations();
	const getReceivedInvitations = useGetReceivedInvitations();
	const currentUser = useSelector(selectCurrentUser);
	const [user, setUser] = useState();
	const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

	useEffect(() => {
		setUser(currentUser);
	}, [currentUser]);

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
				{user && user.contacts.length > 0 ? (
					<ul>
						{user.contacts.map((contact) => (
							<li key={contact} className="text-lg my-2">
								{contact}
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
