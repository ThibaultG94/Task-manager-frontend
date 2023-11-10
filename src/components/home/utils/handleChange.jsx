import { confirmChecker, passwordChecker } from '../../utils/formValidation';
import { useDebounce } from '../../utils/useDebounce';

const useHandleChange = ({
	formData,
	setErrors,
	setFormData,
	setIsTypingPassword,
	setIsTypingPasswordConfirm,
	setProgressBar,
}) => {
	const debouncedPasswordChecker = useDebounce(passwordChecker, 400);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => {
			const updatedFormData = { ...prevFormData, [name]: value };

			if (name === 'password') {
				debouncedPasswordChecker(value, setErrors, setProgressBar);
				setIsTypingPassword(true);
				setErrors((prevErrors) => ({
					...prevErrors,
					passwordConfirm: confirmChecker(
						updatedFormData.passwordConfirm,
						value
					),
				}));
			}

			if (name === 'passwordConfirm' && value !== '') {
				confirmChecker(value, formData.password);
				setIsTypingPasswordConfirm(true);
			}

			return updatedFormData;
		});

		setIsTypingPassword(false);
		setIsTypingPasswordConfirm(false);
	};

	return handleChange;
};

export default useHandleChange;
