import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

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
			},
            {
                withCredentials: true,
            });
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return registerUser;
};
