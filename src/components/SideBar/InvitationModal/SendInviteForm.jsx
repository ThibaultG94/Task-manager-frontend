import React, { useState } from 'react';
import SubmitButton from '../../ModalForm/SubmitButton';
import { useDispatch } from 'react-redux';
import { useSendInvitation } from '../../../api/invitations/useSendInvitation';
import { useGetSentOutInvitations } from '../../../api/invitations/useGetSentOutInvitations';
import { useSetInvitationNotification } from '../../../api/notifications/useSetInvitationNotification';
import {
	sendInvitationFailure,
	sendInvitationSuccess,
} from '../../../store/feature/invitations.slice';
import ErrorInvitation from './ErrorInvitation';
import { toast } from 'react-toastify';

const SendInviteForm = ({ userId }) => {
	const dispatch = useDispatch();
	const sendInvitation = useSendInvitation();
	const getSendOutInvitations = useGetSentOutInvitations();
	const setInvitationNotification = useSetInvitationNotification();

	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState(null);
	const [errorCode, setErrorCode] = useState(null);
	const [errors, setErrors] = useState({
		email: null,
	});
	const [displayErrors, setDisplayErrors] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const invitation = {
			userId,
			email,
			message,
		};

		try {
			const res = await sendInvitation(invitation);
			if (res.status === 200) {
				await setInvitationNotification(res.data.invitation, userId);
				setEmail('');
				setMessage('');
				setErrors({
					email: null,
				});
				await getSendOutInvitations(userId);
				toast.success('Invitation envoyée !');
				dispatch(sendInvitationSuccess(res.data.invitation));
			} else {
				setError(res);
			}
		} catch (error) {
			if (error.response) {
				setErrorCode(error.response.status);
				setError(error);
			} else {
				setErrorCode(null);
			}
			setDisplayErrors(true);
			dispatch(sendInvitationFailure(error));
		}
	};

	return (
		<div id="tab-content1" className="mt-4">
			<h2 className="text-dark-blue mb-4 text-xl sm:text-2xl text-center">
				Ajouter un contact
			</h2>
			<form
				className="w-5/6 mx-auto mb-9 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row mb-2 sm:mb-4 md:mb-5">
					<div className="flex flex-col md:w-1/2 sm:pr-1 md:pr-2">
						<div className="mb-2 sm:mb-4 md:mb-5">
							<input
								className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
								maxLength="50"
								name="email"
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Saisissez l'addresse email du contact"
								required
								type="email"
								value={email}
							/>
							<span className="h-6 my-2 text-red-400 text-xs md:text-sm">
								{errors.email}
							</span>
						</div>
					</div>
					<div className="flex flex-col flex-grow justify-between w-full md:w-1/2 pl-0 md:pl-2">
						<textarea
							className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 flex-grow focus:outline-none focus:shadow-outline leading-tight p-2 resize-none rounded shadow w-full"
							cols="30"
							name="message"
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Ecrivez votre message ici (optionnel)"
							rows="5"
							value={message}></textarea>
					</div>
				</div>
				<SubmitButton label={"Envoyer l'invitation"} />

				{displayErrors && (
					<ErrorInvitation
						error={error}
						setErrors={setErrors}
						errorCode={errorCode}
					/>
				)}
			</form>
		</div>
	);
};

export default SendInviteForm;
