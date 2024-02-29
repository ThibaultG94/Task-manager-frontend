import { useLocation, useNavigate } from 'react-router-dom';
import getUserId from '../api/users/getUserId';

export const useCheckAuthentication = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const location = useLocation();

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
			if (error.response) {
				switch (error.response.status) {
					case 401:
						navigate('/home');
						break;
					case 500:
						navigate('/pages/error-500');
						break;
					case 404:
						navigate('/pages/error-404');
						break;
					default:
						navigate('/pages/error');
						break;
				}
			} else {
				navigate('/pages/error');
			}
		}
	};

	return checkAuthentication;
};
