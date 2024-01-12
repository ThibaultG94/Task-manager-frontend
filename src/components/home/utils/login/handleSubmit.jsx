import { useNavigate } from 'react-router-dom';
import { login } from '../../../../api/users/loginUser';

const useHandleSubmit = ({
	formData,
	setDisplayErrors,
	setError,
	setErrorCode,
}) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (formData.email && formData.password) {
				const res = await login(
					API_URL,
					formData.email,
					formData.password
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
