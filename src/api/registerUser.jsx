import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useRegisterUser = () => {
	const errorApi = useErrorApi();

	const registerUser = async (pseudo, email, password) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(`${API_URL}/users/register`, {
				username: pseudo,
				email: email,
				password: password,
				role: 'user',
			});
			return res.data.user;
		} catch (error) {
			errorApi(error);
		}
	};

	return registerUser;
};
