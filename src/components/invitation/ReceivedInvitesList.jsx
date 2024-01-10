import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectReceivedInvitations } from '../../store/selectors/invitationsSelectors';

const ReceivedInvitesList = ({ userId }) => {
	const invitations = useSelector(selectReceivedInvitations);
	const [receivedInvitationsPending, setReceivedInvitationsPending] =
		useState();
	const [receivedInvitationsAccepted, setReceivedInvitationsAccepted] =
		useState();

	useEffect(() => {
		if (invitations) {
			setReceivedInvitationsPending(invitations.pending || []);
			setReceivedInvitationsAccepted(invitations.accepted || []);
		}
	}, [invitations]);

	return (
		<div
			id="tab-content3"
			className="p-4 md:p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-dark-blue font-semibold mb-4 text-xl sm:text-2xl text-center">
				Invitations reçues
			</h2>
			<div className="flex flex-wrap md:flex-nowrap max-h-96 overflow-auto">
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-center mb-4">
						En attente
					</h3>
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
										<button className="accept-icon">
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
										<button className="decline-icon">
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
					<h3 className="text-lg font-semibold text-center mb-4">
						Acceptés
					</h3>
					{receivedInvitationsAccepted &&
						receivedInvitationsAccepted.map((invitation) => (
							<div
								key={invitation.invitationId}
								className="bg-green-100 rounded-lg p-4 mb-4 last:mb-0 hover:bg-green-200 transition duration-300 ease-in-out">
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
			</div>
		</div>
	);
};

export default ReceivedInvitesList;
