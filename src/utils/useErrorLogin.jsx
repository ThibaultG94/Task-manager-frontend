import { useNavigate } from 'react-router-dom';

const useErrorLogin = ({ setInputsFormErrors  }) => {
	const navigate = useNavigate();

	const errorLogin = (error) => {
		const errorCode = error.response ? error.response.status : 500;
		if (errorCode !== 500) {
			switch (errorCode) {
				case 404:
					if (error.response.data.message === 'User not found') {
						setInputsFormErrors(() => ({
							email: "L'email n'est pas enregistré.",
							password: null,
						}));
					}
					break;
				case 401:
					if (error.response.data.message === 'Invalid password') {
						setInputsFormErrors(() => ({
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
	};

	return errorLogin;
};

export default useErrorLogin;
