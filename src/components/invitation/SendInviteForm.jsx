import React, { useState } from 'react';
import EmailInput from './EmailInput';
import MessageTextarea from './MessageTextarea';
import { useSendInvitation } from '../../api/sendInvitation';
import SubmitButton from '../modal/SubmitButton';
import { toast } from 'react-toastify';

const SendInviteForm = ({ userId }) => {
	const sendInvitation = useSendInvitation();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		const invitation = {
			userId,
			email,
			message,
		};

		try {
			await sendInvitation(invitation);
			toast.success('Invitation envoyée !');
		} catch (error) {
			console.error('Error with SendInviteForm', error);
			toast.error('Une erreur est survenue');
		}
	};

	return (
		<div id="tab-content1" className="mt-4">
			<h2 className="font-light mb-2 sm:mb-4 md:mb-6 text-lg sm:text-xl md:text-2xl text-center">
				Ajouter un contact
			</h2>
			<form
				className="w-5/6 mx-auto mb-9 flex flex-col"
				onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row mb-2 sm:mb-4 md:mb-5">
					<div className="flex flex-col md:w-1/2 sm:pr-1 md:pr-2">
						<EmailInput email={email} setEmail={setEmail} />
					</div>
					<MessageTextarea
						message={message}
						setMessage={setMessage}
					/>
				</div>
				<SubmitButton label={"Envoyer l'invitation"} />
			</form>
		</div>
	);
};

export default SendInviteForm;
