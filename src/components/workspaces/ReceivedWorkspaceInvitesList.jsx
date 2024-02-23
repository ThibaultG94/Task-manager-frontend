import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectReceivedWorkspaceInvitations } from '../../store/selectors/workspaceInvitationsSelectors';
import { useAcceptWorkspaceInvitation } from '../../api/workspaceInvitations/acceptWorkspaceInvitation';
import { useDeclineWorkspaceInvitation } from '../../api/workspaceInvitations/declineWorkspaceInvitation';
import { useGetReceivedWorkspaceInvitations } from '../../api/workspaceInvitations/getReceivedWorkspaceInvitations';
import { useGetWorkspaces } from '../../api/workspaces/getWorkspaces';

const ReceivedWorkspaceInvitesList = ({ userId }) => {
	const invitations = useSelector(selectReceivedWorkspaceInvitations);
	const getWorkspaces = useGetWorkspaces();
	const acceptWorkspaceInvitation = useAcceptWorkspaceInvitation();
	const declineWorkspaceInvitation = useDeclineWorkspaceInvitation();
	const getReceivedWorkspaceInvitations =
		useGetReceivedWorkspaceInvitations();
	const [receivedInvitationsPending, setReceivedInvitationsPending] =
		useState();
	const [receivedInvitationsAccepted, setReceivedInvitationsAccepted] =
		useState();
	const [receivedInvitationsRejected, setReceivedInvitationsRejected] =
		useState();
	const [isRejectedOpen, setIsRejectedOpen] = useState(false);

	useEffect(() => {
		if (invitations) {
			setReceivedInvitationsPending(invitations.pending || []);
			setReceivedInvitationsAccepted(invitations.accepted || []);
			setReceivedInvitationsRejected(invitations.rejected || []);
		}
	}, [invitations]);

	const handleAcceptInvitation = async (invitationId) => {
		try {
			const res = await acceptWorkspaceInvitation(invitationId, userId);
			if (res.status === 200) {
				await getReceivedWorkspaceInvitations(userId);
				toast.success("L'invitation a été acceptée");
				await getWorkspaces(userId);
				// await setInvitationNotification(res.data.invitation, userId);
			}
		} catch (error) {
			toast.error("Échec de l'acceptation de l'invitation");
			return;
		}
	};

	const handleDeclineInvitation = async (invitationId) => {
		try {
			await declineWorkspaceInvitation(invitationId, userId);
			await getReceivedWorkspaceInvitations(userId);
			toast.success("L'invitation a été déclinée");
		} catch (error) {
			toast.error("Échec du rejet de l'invitation");
			return;
		}
	};

	return (
		<div
			id="tab-content3"
			className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-dark-blue mb-4 text-xl sm:text-2xl text-center">
				Invitations Workspace reçues
			</h2>
			<div className="md:flex md:flex-wrap md:justify-between max-h-96 overflow-auto">
				<div className="flex-1">
					<h3 className="text-lg text-center mb-4">En attente</h3>
					{receivedInvitationsPending &&
						receivedInvitationsPending.map((invitation) => (
							<div
								key={invitation.invitationId}
								className="bg-light-blue rounded-lg p-4 mb-4 last:mb-0 hover:bg-blue-200 transition duration-300 ease-in-out">
								<div className="flex justify-between items-center">
									<div>
										<p className="text-dark-blue font-medium">
											{invitation.senderUsername}{' '}
											<span className="text-gray-500">
												({invitation.senderEmail})
											</span>
										</p>
										<p className="text-gray-600 italic">
											{invitation.message}
										</p>
									</div>
									<div className="flex flex-col gap-2 ml-2 invitation-list">
										<button
											className="accept-icon"
											onClick={() =>
												handleAcceptInvitation(
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
													d="M4.5 12.75l6 6 9-13.5"
												/>
											</svg>
										</button>
										<button
											className="decline-icon"
											onClick={() =>
												handleDeclineInvitation(
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
					{receivedInvitationsPending &&
						receivedInvitationsPending.length === 0 && (
							<p className="text-gray-500 font-light text-center">
								Vous n'avez envoyé aucune invitation
							</p>
						)}
				</div>
				<div className="flex-1 mt-6 md:mt-0 md:ml-8">
					<h3 className="text-lg text-center mb-4">Acceptés</h3>
					{receivedInvitationsAccepted &&
						receivedInvitationsAccepted.map((invitation) => (
							<div
								key={invitation.invitationId}
								className="bg-light-blue rounded-lg p-4 mb-4 last:mb-0 hover:bg-yellow-primary transition duration-300 ease-in-out">
								<p className="text-dark-blue font-medium">
									{invitation.senderUsername}{' '}
									<span className="text-gray-500">
										({invitation.senderEmail})
									</span>
								</p>
								<p className="text-gray-600 italic">
									{invitation.message}
								</p>
							</div>
						))}
					{receivedInvitationsAccepted &&
						receivedInvitationsAccepted.length === 0 && (
							<p className="text-gray-500 font-light text-center">
								Vous n'avez aucune invitation acceptée
							</p>
						)}
				</div>
				<div className="mt-6 w-full">
					<h3 className="text-lg text-center mb-4">Refusées</h3>
					<div>
						<button
							className="accordion-button"
							onClick={() => setIsRejectedOpen(!isRejectedOpen)}>
							Voir les invitations refusées
						</button>
						{isRejectedOpen && (
							<div className="accordion-content">
								{receivedInvitationsRejected &&
									receivedInvitationsRejected.map(
										(invitation) => (
											<div
												key={invitation.invitationId}
												className="bg-light-blue rounded-lg p-4 mb-4 last:mb-0 hover:bg-blue-200 transition duration-300 ease-in-out">
												<div className="flex justify-between items-center">
													<div>
														<p className="text-dark-blue font-medium">
															{
																invitation.senderUsername
															}{' '}
															<span className="text-gray-500">
																(
																{
																	invitation.senderEmail
																}
																)
															</span>
														</p>
														<p className="text-gray-600 italic">
															{invitation.message}
														</p>
													</div>
													{/* Les boutons ou autres actions ici */}
												</div>
											</div>
										)
									)}
								{receivedInvitationsRejected &&
									receivedInvitationsRejected.length ===
										0 && (
										<p className="text-gray-500 font-light text-center">
											Vous n'avez aucune invitation
											refusée
										</p>
									)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReceivedWorkspaceInvitesList;
