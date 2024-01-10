import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorInvitation = ({ error, setErrors, errorCode }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (errorCode) {
			switch (errorCode) {
				case 400:
					if (error.response.data.message === 'User does not exist') {
						setErrors(() => ({
							email: "L'email n'est pas enregistré.",
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

export default ErrorInvitation;
