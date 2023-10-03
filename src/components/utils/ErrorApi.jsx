import { useNavigate } from 'react-router-dom';

const ErrorApi = ({ errorCode }) => {
	const navigate = useNavigate();

	if (errorCode) {
		switch (errorCode) {
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
	}
};

export default ErrorApi;
