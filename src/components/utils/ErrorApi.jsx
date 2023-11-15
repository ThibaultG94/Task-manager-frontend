import { useNavigate } from 'react-router-dom';

export const useErrorApi = () => {
	const navigate = useNavigate();

	const errorApi = (error) => {
		const errorCode = error.response ? error.response.status : 500;
		switch (errorCode) {
			case 401:
				navigate('/home');
				break;
			case 404:
				navigate('/pages/error-404');
				break;
			case 500:
				navigate('/pages/error-500');
				break;
			default:
				navigate('/pages/error');
				break;
		}
	};

	return errorApi;
};
