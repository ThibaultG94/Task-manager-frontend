import { confirmChecker, passwordChecker } from './signupFormValidation';
import { useDebounce } from './useDebounce';

export const useHandleSignupInputChange = ({
	inputsFormValues,
	setInputsFormErrors,
	setInputsFormValues,
	setIsTypingPassword,
	setIsTypingConfirmPassword,
	setProgressBar,
}) => {
	const debouncedPasswordChecker = useDebounce(passwordChecker, 400);

	const handleSignupInputChange = (e) => {
		const { name, value } = e.target;

		setInputsFormValues((prevFormData) => {
			const updatedFormData = { ...prevFormData, [name]: value };

			if (name === 'password') {
				debouncedPasswordChecker(
					value,
					setInputsFormErrors,
					setProgressBar
				);
				setIsTypingPassword(true);
				setInputsFormErrors((prevErrors) => ({
					...prevErrors,
					confirmPassword: confirmChecker(
						updatedFormData.confirmPassword,
						value
					),
				}));
			}

			if (name === 'confirmPassword' && value !== '') {
				confirmChecker(value, inputsFormValues.password);
				setIsTypingConfirmPassword(true);
			}

			return updatedFormData;
		});

		setIsTypingPassword(false);
		setIsTypingConfirmPassword(false);
	};

	return handleSignupInputChange;
};

export const useHandleLoginInputChange = ({ setInputsFormValues }) => {
	const handleLoginInputChange = (e) => {
		const { name, value } = e.target;

		setInputsFormValues((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	return handleLoginInputChange;
};
