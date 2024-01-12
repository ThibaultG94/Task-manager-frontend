import axios from 'axios';
import { useErrorApi } from '../../components/utils/ErrorApi';
import { useNavigate } from 'react-router-dom';

export const useLogoutUser = () => {
	const navigate = useNavigate();
	const errorApi = useErrorApi();
	const API_URL = process.env.REACT_APP_API_URL;

	const deleteCookie = (name) => {
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
	};

	const logoutUser = async () => {
		try {
			const res = await axios.post(
				`${API_URL}/users/logout`,
				{},
				{ withCredentials: true }
			);

			deleteCookie('token');
			deleteCookie('refreshToken');

			sessionStorage.removeItem('redirectAfterLogin');
			sessionStorage.removeItem('userId');

			navigate('/home');

			return res.data.message;
		} catch (error) {
			errorApi(error);
		}
	};

	return logoutUser;
};
