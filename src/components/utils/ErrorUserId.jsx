import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorUserId = ({ errorCode }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCode) {
			switch (errorCode) {
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
		}
	}, [errorCode]);

	return null;
};

export default ErrorUserId;
