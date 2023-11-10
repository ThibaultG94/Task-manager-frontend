import { toast } from 'react-toastify';
import { useRegisterUser } from '../../../api/registerUser';

const useHandleSubmit = ({
	errors,
	formData,
	setFormData,
	setIsSubmitting,
	setProgressBar,
}) => {
	const registerUser = useRegisterUser();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			formData.username &&
			formData.email &&
			formData.password &&
			formData.passwordConfirm &&
			!errors.password &&
			!errors.passwordConfirm
		) {
			setIsSubmitting(true);
			await registerUser(
				formData.username,
				formData.email,
				formData.password
			);
			setFormData({
				username: '',
				email: '',
				password: '',
				passwordConfirm: '',
			});
			setProgressBar('');
			toast.success('Votre compte a été créé avec succès !');
			setIsSubmitting(false);
		} else {
			alert('Veuillez remplir correctement les champs');
		}
	};

	return handleSubmit;
};

export default useHandleSubmit;
