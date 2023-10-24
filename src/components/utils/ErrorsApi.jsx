import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorsApi = ({ errorCode }) => {
	const navigate = useNavigate();

	useEffect(() => {
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
	}, [errorCode]);
};

export default ErrorsApi;
