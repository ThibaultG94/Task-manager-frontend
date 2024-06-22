import { useLocation, useNavigate } from 'react-router-dom';
import { useErrorApi } from './useErrorApi';
import { useGetUserId } from '../api/users/useGetUserId';

export const useCheckAuthentication = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const location = useLocation();
	const errorApi = useErrorApi();
	const getUserId = useGetUserId();

	const checkAuthentication = async () => {
		try {
			const currentPath = location.pathname;
			const userId = await getUserId(API_URL);

			if (userId && currentPath === '/home') {
				navigate('/pages/dashboard');
			} else if (!userId && currentPath !== '/home') {
				navigate('/home');
			}

			sessionStorage.setItem('redirectAfterLogin', currentPath);
		} catch (error) {
			errorApi(error);
		}
	};

	return checkAuthentication;
};
