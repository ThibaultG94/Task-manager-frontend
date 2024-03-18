import { toast } from 'react-toastify';
import { useRegisterUser } from '../api/users/useRegisterUser';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/users/loginUser';

export const useSubmitForSignupAccount = ({
	inputsFormErrors,
	inputsFormValues,
	setInputsFormValues,
	setIsSubmitting,
	setProgressBar,
}) => {
	const registerUser = useRegisterUser();

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
			await registerUser(
				inputsFormValues.username,
				inputsFormValues.email,
				inputsFormValues.password
			);
			setInputsFormValues({
				username: '',
				email: '',
				password: '',
				confirmPassword: '',
			});
			setProgressBar('');
			toast.success('Votre compte a été créé avec succès !');
			setIsSubmitting(false);
		} else {
			alert('Veuillez remplir correctement les champs');
		}
	};

	return submitForSignupAccount;
};

export const useSubmitForLoginAccount = ({ inputsFormValues, setErrorWithLogin }) => {
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

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
