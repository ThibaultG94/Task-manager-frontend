import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useResetPassword = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const errorApi = useErrorApi();

	const resetPassword = async (token, password) => {
		try {
			const response = await axios.post(
				`${API_URL}/users/reset-password/${token}`,
				{ password }
			);

			return response;
		} catch (error) {
			errorApi(error);
		}
	};

	return resetPassword;
};
