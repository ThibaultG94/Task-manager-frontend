import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EmailInput from './EmailInput';
import MessageTextarea from './MessageTextarea';
import { useSendInvitation } from '../../api/invitations/sendInvitation';
import SubmitButton from '../modal/SubmitButton';
import { toast } from 'react-toastify';
import ErrorInvitation from './ErrorInvitation';
import {
	sendInvitationFailure,
	sendInvitationSuccess,
} from '../../store/feature/invitations.slice';
import { useGetSentOutInvitations } from '../../api/invitations/getSentOutInvitations';
import { useSetInvitationNotification } from '../../api/notifications/setInvitationNotification';

const SendInviteForm = ({ userId }) => {
	const dispatch = useDispatch();
	const sendInvitation = useSendInvitation();
	const setInvitationNotification = useSetInvitationNotification();
	const getSendOutInvitations = useGetSentOutInvitations();

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
						<EmailInput
							email={email}
							setEmail={setEmail}
							errors={errors}
						/>
					</div>
					<MessageTextarea
						message={message}
						setMessage={setMessage}
					/>
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
