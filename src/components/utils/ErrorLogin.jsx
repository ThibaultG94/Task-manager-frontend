import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorLogin = ({ error, setErrors, errorCode }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCode) {
			switch (errorCode) {
				case 404:
					if (error.response.data.message === 'User not found') {
						setErrors((prevErrors) => ({
							...prevErrors,
							email: "L'email n'est pas enregistré.",
						}));
					}
					break;
				case 401:
					console.log('401');
					if (error.response.data.message === 'Invalid password') {
						console.log('Invalid password');
						setErrors((prevErrors) => ({
							...prevErrors,
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
	}, []);

	return null;
};

export default ErrorLogin;
