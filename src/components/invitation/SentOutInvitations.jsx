import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectDispathedInvitations } from '../../store/selectors/invitationsSelectors';
import { useCancelInvitation } from '../../api/invitations/cancelInvitation';
import { toast } from 'react-toastify';
import { useGetSentOutInvitations } from '../../api/invitations/getSentOutInvitations';

const SentOutInvitations = ({ userId }) => {
	const invitations = useSelector(selectDispathedInvitations);
	const cancelInvitation = useCancelInvitation();
	const getSendOutInvitations = useGetSentOutInvitations();
	const [invitationsPending, setInvitationsPending] = useState([]);
	const [invitationsAccepted, setInvitationsAccepted] = useState([]);

	const handleCancelInvitation = async (invitationId) => {
		try {
			await cancelInvitation(invitationId);
			await getSendOutInvitations(userId);
			toast.success("L'invitation a été annulée");
		} catch (error) {
			toast.error("Échec de l'annulation de l'invitation");
			return;
		}
	};

	useEffect(() => {
		if (invitations) {
			setInvitationsPending(invitations.pending || []);
			setInvitationsAccepted(invitations.accepted || []);
		}
	}, [invitations]);

	return (
		<div
			id="tab-content2"
			className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-dark-blue font-semibold mb-6 text-xl sm:text-2xl text-center">
				Invitations envoyées
			</h2>
			<div className="flex flex-wrap md:flex-nowrap max-h-96 overflow-auto">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-center mb-4">
						En attente
					</h3>
					{invitationsPending &&
						invitationsPending.map((invitation) => (
							<div
								key={invitation.invitationId}
								className="bg-light-blue rounded-lg p-4 mb-4 last:mb-0 hover:bg-blue-200 transition duration-300 ease-in-out relative">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-dark-blue font-medium">
											{invitation.guestUsername}{' '}
											<span className="text-gray-500">
												({invitation.guestEmail})
											</span>
										</p>
										<p className="text-gray-600 italic">
											{invitation.message}
										</p>
									</div>
									<div className="flex flex-col gap-2 ml-2 invitation-list">
										<button
											className="decline-icon"
											onClick={() =>
												handleCancelInvitation(
													invitation.invitationId
												)
											}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-6 h-6">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						))}

					{invitationsPending && invitationsPending.length === 0 && (
						<p className="text-gray-500 font-light text-center">
							Vous n'avez envoyé aucune invitation
						</p>
					)}
				</div>
				<div className="flex-1 mt-6 md:mt-0 md:ml-8">
					<h3 className="text-lg font-semibold text-center mb-4">
						Acceptés
					</h3>
					{invitationsAccepted &&
						invitationsAccepted.map((invitation) => (
							<div
								key={invitation.invitationId}
								className="bg-green-100 rounded-lg p-4 mb-4 last:mb-0 hover:bg-green-200 transition duration-300 ease-in-out">
								<p className="text-dark-blue font-medium">
									{invitation.guestUsername}{' '}
									<span className="text-gray-500">
										({invitation.guestEmail})
									</span>
								</p>
								<p className="text-gray-600 italic">
									{invitation.message}
								</p>
							</div>
						))}
					{invitationsAccepted &&
						invitationsAccepted.length === 0 && (
							<p className="text-gray-500 font-light text-center">
								Vous n'avez aucune invitation acceptée
							</p>
						)}
				</div>
			</div>
		</div>
	);
};

export default SentOutInvitations;
