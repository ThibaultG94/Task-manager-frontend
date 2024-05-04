import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectReceivedWorkspaceInvitations } from '../../../store/selectors/workspaceInvitationsSelectors';
import { useAcceptWorkspaceInvitation } from '../../../api/workspaceInvitations/useAcceptWorkspaceInvitation';
import { useDeclineWorkspaceInvitation } from '../../../api/workspaceInvitations/useDeclineWorkspaceInvitation';
import { useGetReceivedWorkspaceInvitations } from '../../../api/workspaceInvitations/useGetReceivedWorkspaceInvitations';
import { toast } from 'react-toastify';
import LoadingEditComponent from '../../Buttons/LoadingEditComponent';
import LoadingDeleteComponent from '../../Buttons/LoadingDeleteComponent';

const ReceivedWorkspaceInvitesList = ({ userId }) => {
	const invitations = useSelector(selectReceivedWorkspaceInvitations);
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
	const [isLoadingAccept, setIsLoadingAccept] = useState(false);
	const [isLoadingDecline, setIsLoadingDecline] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (invitations) {
			setReceivedInvitationsPending(invitations.pending || []);
			setReceivedInvitationsAccepted(invitations.accepted || []);
			setReceivedInvitationsRejected(invitations.rejected || []);
		}
	}, [invitations]);

	const handleAcceptInvitation = async (invitationId) => {
		try {
			setIsLoadingAccept(true);
			const res = await acceptWorkspaceInvitation(invitationId, userId);
			if (res.status === 200) {
				setIsLoadingAccept(false);
				toast.success("L'invitation a été acceptée");
			}
		} catch (error) {
			toast.error("Échec de l'acceptation de l'invitation");
			return;
		}
	};

	const handleDeclineInvitation = async (invitationId) => {
		try {
			setIsLoadingDecline(true);
			await declineWorkspaceInvitation(invitationId, userId);
			setIsLoadingDecline(false);

			setIsLoading(true);
			await getReceivedWorkspaceInvitations(userId);
			setIsLoading(false);
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
					{receivedInvitationsPending && !isLoading &&
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
										<p className="text-gray-600 font-bold">
											{invitation.workspace.title}
										</p>
									</div>
									<div className="flex flex-col gap-2 ml-2 invitation-list">
										{isLoadingAccept ? (
											<LoadingEditComponent />
										) : (
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
										)}
										{isLoadingDecline ? (
											<LoadingDeleteComponent />
										) : (
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
										)}
									</div>
								</div>
							</div>
						))}
					{receivedInvitationsPending && !isLoading &&
						receivedInvitationsPending.length === 0 && (
							<p className="text-gray-500 font-light text-center">
								Vous n'avez envoyé aucune invitation
							</p>
						)}
				</div>
				<div className="flex-1 mt-6 md:mt-0 md:ml-8">
					<h3 className="text-lg text-center mb-4">Acceptés</h3>
					{receivedInvitationsAccepted && !isLoading &&
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
								<p className="text-gray-600 font-bold">
									{invitation.workspace.title}
								</p>
							</div>
						))}
					{receivedInvitationsAccepted && !isLoading &&
						receivedInvitationsAccepted.length === 0 && (
							<p className="text-gray-500 font-light text-center">
								Vous n'avez aucune invitation acceptée
							</p>
						)}
				</div>
				<div className="mt-6 w-full flex justify-center">
					<div className="w-96">
						<h3 className="text-lg text-center mb-1">Refusées</h3>
						<div className='flex flex-col justify-center items-center'>
							<button
								className="mb-2 mx-auto text-sm text-gray-600 hover:text-gray-800 focus:outline-none focus:underline"
								onClick={() =>
									setIsRejectedOpen(!isRejectedOpen)
								}>
								{isRejectedOpen
									? 'Cacher les invitations refusées '
									: 'Voir les invitations refusées '}
								{isRejectedOpen ? (
									<i className="fa-solid fa-arrow-up"></i>
								) : (
									<i className="fa-solid fa-arrow-down"></i>
								)}
							</button>

							{isRejectedOpen && (
								<div className="accordion-content">
									{receivedInvitationsRejected && !isLoading &&
										receivedInvitationsRejected.map(
											(invitation) => (
												<div
													key={
														invitation.invitationId
													}
													className="bg-light-blue rounded-lg p-4 mb-4 last:mb-0 hover:bg-blue-200 transition duration-300 ease-in-out">
													<div className="flex justify-between items-center">
														<div>
															<p className="text-dark-blue font-medium">
																{
																	invitation.senderUsername
																}{' '}
																<span className="text-gray-500">
																	({
																		invitation.senderEmail
																	})
																</span>
															</p>
															<p className="text-gray-600 font-bold">
																{
																	invitation.workspace.title
																}
															</p>
														</div>
														<div className="flex flex-col gap-2 ml-2 invitation-list">
														{isLoadingAccept ? (
															<LoadingEditComponent />
														) : (
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
														)}
														</div>
													</div>
												</div>
											)
									)}
									{receivedInvitationsRejected && !isLoading &&
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
		</div>
	);
};

export default ReceivedWorkspaceInvitesList;
