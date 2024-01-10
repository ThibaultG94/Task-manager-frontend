import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorInvitation = ({ error, setErrors, errorCode }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCode) {
			switch (errorCode) {
				case 400:
					if (error.response.data.message === 'User does not exist') {
						setErrors(() => ({
							email: "L'email n'est pas enregistré.",
						}));
					} else if (
						error.response.data.message ===
						'Invitation already sent to this user'
					) {
						setErrors(() => ({
							email: "L'invitation a déjà été envoyée à cet utilisateur.",
						}));
					} else if (
						error.response.data.message ===
						'You cannot send an invitation to yourself'
					) {
						setErrors(() => ({
							email: "Vous ne pouvez pas vous envoyer d'invitation.",
						}));
					} else if (
						error.response.data.message ===
						'Invitation already received from this user'
					) {
						setErrors(() => ({
							email: 'Vous avez déjà reçu une invitation de cet utilisateur.',
						}));
					}
					break;
				default:
					navigate('/pages/error');
					break;
			}
		} else {
			navigate('/pages/error-500');
		}
	}, [error]);

	return null;
};

export default ErrorInvitation;
