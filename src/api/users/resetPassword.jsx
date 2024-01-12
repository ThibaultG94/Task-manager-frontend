import axios from 'axios';

export const useResetPassword = () => {
	const API_URL = process.env.REACT_APP_API_URL;

	const resetPassword = async (token, password) => {
		try {
			const response = await axios.post(
				`${API_URL}/users/reset-password/${token}`,
				{ password }
			);

			return response;
		} catch (error) {
			console.error('Password reset error', error);
			throw error;
		}
	};

	return resetPassword;
};
