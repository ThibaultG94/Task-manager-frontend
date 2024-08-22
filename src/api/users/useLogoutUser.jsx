import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useErrorApi } from '../../utils/useErrorApi';
import { resetStore } from '../../store/actions/reset.actions';

export const useLogoutUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errorApi = useErrorApi();
	const API_URL = process.env.REACT_APP_API_URL;

	const deleteCookie = async (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
	};

	const logoutUser = async () => {
		try {
			const res = await axios.post(
				`${API_URL}/users/logout`,
				{},
				{ withCredentials: true }
			);

			await deleteCookie('token');
			await deleteCookie('refreshToken');

			sessionStorage.removeItem('redirectAfterLogin');
			sessionStorage.removeItem('userId');

			dispatch(resetStore());

			sessionStorage.setItem('redirectAfterLogin', '/pages/dashboard');

			navigate('/home');

			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return logoutUser;
};
