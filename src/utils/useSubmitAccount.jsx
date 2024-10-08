import { toast } from 'react-toastify';
import { useRegisterUser } from '../api/users/useRegisterUser';
import { useNavigate } from 'react-router-dom';
// import { login } from '../api/users/loginUser';
import { useLoginUser } from '../api/users/useLoginUser';
import { useErrorApi } from './useErrorApi';

export const useSubmitForSignupAccount = ({
	inputsFormErrors,
	inputsFormValues,
	setInputsFormValues,
	setIsSubmitting,
	setProgressBar,
}) => {
	const registerUser = useRegisterUser();
	const navigate = useNavigate();
	const errorApi = useErrorApi();

	const submitForSignupAccount = async (e) => {
		e.preventDefault();

		if (
			inputsFormValues.username &&
			inputsFormValues.email &&
			inputsFormValues.password &&
			inputsFormValues.confirmPassword &&
			!inputsFormErrors.password &&
			!inputsFormErrors.confirmPassword
		) {
			setIsSubmitting(true);
			const res = await registerUser(
				inputsFormValues.username,
				inputsFormValues.email,
				inputsFormValues.password
			);
			if (res.status === 200) {
				setInputsFormValues({
					username: '',
					email: '',
					password: '',
					confirmPassword: '',
				});
				setProgressBar('');
				toast.success('Votre compte a été créé avec succès !');
				setIsSubmitting(false);
				const userId = await res.data.user.id;
				sessionStorage.setItem('userId', userId);
				navigate('/pages/dashboard');
			} else {
				errorApi(res.status);
			}
		} else {
			alert('Veuillez remplir correctement les champs');
		}
	};

	return submitForSignupAccount;
};

export const useSubmitForLoginAccount = ({ inputsFormValues, setErrorWithLogin }) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();
	const login = useLoginUser();

	const submitForLoginAccount = async (e) => {
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
					setErrorWithLogin(res);
				}
			}
		} catch (error) {
			setErrorWithLogin(error);
		}
	};

	return submitForLoginAccount;
};
