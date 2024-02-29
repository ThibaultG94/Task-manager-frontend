import { toast } from 'react-toastify';
import { useRegisterUser } from '../api/users/useRegisterUser';

const useSubmitForSignupAccount = ({
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

export default useSubmitForSignupAccount;
