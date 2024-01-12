import axios from 'axios';
import { toast } from 'react-toastify';

export const useForgotPassword = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const forgotPassword = async (email) => {
		try {
			const response = await axios.post(
				`${API_URL}/users/forgot-password`,
				{
					email,
				}
			);

			if (response.status === 200) {
				toast.success(
					"Un email de réinitialisation vous a été envoyé à l'adresse " +
						email
				);
			} else if (response.status === 500) {
				console.error('Password reset error', response);
			}
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message);
			} else {
				toast.error(
					"Une erreur est survenue lors de l'envoi de l'email"
				);
			}
		}
	};

	return forgotPassword;
};
