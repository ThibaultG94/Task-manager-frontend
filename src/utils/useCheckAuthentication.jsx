import { useLocation, useNavigate } from 'react-router-dom';
import getUserId from '../api/users/getUserId';
import { useErrorApi } from './useErrorApi';

export const useCheckAuthentication = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const location = useLocation();
	const errorApi = useErrorApi();

	const checkAuthentication = async () => {
		try {
			const userId = await getUserId(API_URL);
			const currentPath = location.pathname;

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
