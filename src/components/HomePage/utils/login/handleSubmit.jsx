import { useNavigate } from 'react-router-dom';
import { login } from '../../../../api/users/loginUser';

const useHandleSubmit = ({
	inputsFormValues,
	setDisplayErrors,
	setError,
	setErrorCode,
}) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (inputsFormValues.email && inputsFormValues.password) {
				const res = await login(
					API_URL,
					inputsFormValues.email,
					inputsFormValues.password
				);
				if (res.status === 200) {
					const userId = await res.data.user.id;
					sessionStorage.setItem('userId', userId);
					navigate('/pages/dashboard');
				} else {
					setError(res);
				}
			}
		} catch (error) {
			if (error.response) {
				setErrorCode(error.response.status);
				setError(error);
			} else {
				setErrorCode(null);
			}
			setDisplayErrors(true);
		}
	};

	return handleSubmit;
};

export default useHandleSubmit;
