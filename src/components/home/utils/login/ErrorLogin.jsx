import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorLogin = ({ error, setErrors, errorCode }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCode) {
			switch (errorCode) {
				case 404:
					if (error.response.data.message === 'User not found') {
						setErrors(() => ({
							email: "L'email n'est pas enregistré.",
							password: null,
						}));
					}
					break;
				case 401:
					if (error.response.data.message === 'Invalid password') {
						setErrors(() => ({
							email: null,
							password: 'Le mot de passe est incorrect.',
						}));
					}
					break;
				default:
					navigate('/pages/error');
					break;
			}
		} else {
			navigate('/pages/error-500');
		}
	}, [error]);

	return null;
};

export default ErrorLogin;
