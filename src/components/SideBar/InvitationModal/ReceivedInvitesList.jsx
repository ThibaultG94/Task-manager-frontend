import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectReceivedInvitations } from '../../../store/selectors/invitationsSelectors';
import { useDeclineInvitation } from '../../../api/invitations/useDeclineInvitation';
import { useAcceptInvitation } from '../../../api/invitations/useAcceptInvitation';
import { toast } from 'react-toastify';
import LoadingComponent from '../../Buttons/LoadingComponent';
import LoadingEditComponent from '../../Buttons/LoadingEditComponent';
import LoadingDeleteComponent from '../../Buttons/LoadingDeleteComponent';

const ReceivedInvitesList = ({ userId }) => {
	const invitations = useSelector(selectReceivedInvitations);
	const acceptInvitation = useAcceptInvitation();
	const declineInvitation = useDeclineInvitation();
	const [receivedInvitationsPending, setReceivedInvitationsPending] = useState();
	const [receivedInvitationsAccepted, setReceivedInvitationsAccepted] = useState();
	const [receivedInvitationsRejected, setReceivedInvitationsRejected] = useState([]);
	const [isRejectedOpen, setIsRejectedOpen] = useState(false);
	const [isLoadingAccept, setIsLoadingAccept] = useState(false);
	const [isLoadingDecline, setIsLoadingDecline] = useState(false);

	const handleAcceptInvitation = async (invitationId) => {
		try {
			setIsLoadingAccept(true);
			const res = await acceptInvitation(invitationId, userId);

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
			await declineInvitation(invitationId, userId);
			setIsLoadingDecline(false);

			toast.success("L'invitation a été déclinée");
		} catch (error) {
			toast.error("Échec du rejet de l'invitation");
			return;
		}
	};

	useEffect(() => {
		if (invitations) {
			setReceivedInvitationsPending(invitations.pending || []);
			setReceivedInvitationsAccepted(invitations.accepted || []);
			setReceivedInvitationsRejected(invitations.rejected || []);
		}
	}, [invitations]);	

	return (
		<div
			id="tab-content3"
			className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-dark-blue mb-4 text-xl sm:text-2xl text-center">
				Invitations reçues
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
					{receivedInvitationsPending &&
						receivedInvitationsPending.length === 0 && (
							<p className="text-gray-500 font-light text-center">
								Vous n'avez envoyé aucune invitation
							</p>
					)}
				</div>
				<div className="flex-1 mt-6 md:mt-0 md:ml-8 mr-4">
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
				<div className="mt-6 w-full flex justify-center">
					<div className="w-96">
						<h3 className="text-lg text-center mb-1">Refusées</h3>
						<div className='flex flex-col justify-center items-center'>
							<button
								className="mb-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none focus:underline"
								onClick={() => setIsRejectedOpen(!isRejectedOpen)}>
								{isRejectedOpen ? 'Cacher les invitations refusées ' : 'Voir les invitations refusées '}
								{isRejectedOpen ? (
									<i className="fa-solid fa-arrow-up"></i>
								) : (
									<i className="fa-solid fa-arrow-down"></i>
								)}
							</button>

							{isRejectedOpen && (
								<div className="accordion-content">
									{receivedInvitationsRejected &&
										receivedInvitationsRejected.map((invitation) => (
											<div
												key={invitation.invitationId}
												className="bg-light-blue rounded-lg p-4 mb-4 last:mb-0 hover:bg-blue-200 transition duration-300 ease-in-out">
												<div className="flex justify-between items-center">
													<p className="text-dark-blue font-medium">
														{invitation.senderUsername}{' '}
														<span className="text-gray-500">
															({invitation.senderEmail})
														</span>
													</p>
												</div>
											</div>
										))
									}
									{receivedInvitationsRejected.length === 0 && (
										<p className="text-gray-500 font-light text-center">
											Vous n'avez aucune invitation refusée
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

export default ReceivedInvitesList;
