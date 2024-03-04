import React, { useEffect, useState } from 'react';
import UsernameSignup from './SignupForm/UsernameSignup';
import EmailSignup from './SignupForm/EmailSignup';
import PasswordSignup from './SignupForm/PasswordSignup';
import ConfirmPasswordSignup from './SignupForm/ConfirmPasswordSignup';
import { useHandleSignupInputChange } from '../../utils/useHandleInputChange';
import {
	validateFormDataOnTyping,
	validateConfirmPasswordOnTyping,
} from '../../utils/signupFormValidation';
import { useSubmitForSignupAccount } from '../../utils/useSubmitAccount';

const SignupForm = ({ setShowLoginForm }) => {
	const [inputsFormErrors, setInputsFormErrors] = useState({
		username: null,
		email: null,
		password: null,
		confirmPassword: null,
	});
	const [inputsFormValues, setInputsFormValues] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [isTypingPassword, setIsTypingPassword] = useState(false);
	const [isTypingConfirmPassword, setIsTypingConfirmPassword] =
		useState(false);
	const [progressBar, setProgressBar] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSignupInputChange = useHandleSignupInputChange({
		inputsFormValues,
		setInputsFormErrors,
		setInputsFormValues,
		setIsTypingPassword,
		setIsTypingConfirmPassword,
		setProgressBar,
	});
	const submitForSignupAccount = useSubmitForSignupAccount({
		inputsFormErrors,
		inputsFormValues,
		setInputsFormValues,
		setIsSubmitting,
		setProgressBar,
	});

	useEffect(() => {
		if (!isTypingPassword && !isTypingConfirmPassword) {
			validateFormDataOnTyping(
				inputsFormValues,
				setInputsFormErrors,
				setProgressBar
			);
		} else if (!isTypingPassword) {
			validateConfirmPasswordOnTyping(
				inputsFormValues,
				setInputsFormErrors
			);
		} else {
			return;
		}
		setIsTypingPassword(false);
		setIsTypingConfirmPassword(false);
	}, [inputsFormValues, isTypingPassword, isTypingConfirmPassword]);

	useEffect(() => {
		if (isTypingConfirmPassword && !isTypingPassword) {
			validateConfirmPasswordOnTyping(
				inputsFormValues,
				setInputsFormErrors
			);
		}
		setIsTypingPassword(false);
		setIsTypingConfirmPassword(false);
	}, [
		inputsFormValues.password,
		inputsFormValues.confirmPassword,
		isTypingPassword,
	]);

	return (
		<section className="bg-light-blue flex h-screen justify-center py-4 sm:py-6 md:py-8 text-dark-blue">
			<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg sm:w-72 md:w-80 lg:w-96">
				<h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl text-center">
					Inscription
				</h2>

				<form
					className="flex flex-col items-start"
					onSubmit={async (e) => await submitForSignupAccount(e)}>
					<UsernameSignup
						inputsFormErrors={inputsFormErrors}
						inputsFormValues={inputsFormValues}
						handleInputChange={handleSignupInputChange}
					/>

					<EmailSignup
						inputsFormErrors={inputsFormErrors}
						inputsFormValues={inputsFormValues}
						handleInputChange={handleSignupInputChange}
					/>

					<PasswordSignup
						inputsFormErrors={inputsFormErrors}
						inputsFormValues={inputsFormValues}
						handleInputChange={handleSignupInputChange}
						progressBar={progressBar}
					/>

					<ConfirmPasswordSignup
						inputsFormErrors={inputsFormErrors}
						inputsFormValues={inputsFormValues}
						handleInputChange={handleSignupInputChange}
					/>

					<div className="w-full flex justify-between md:justify-end">
						<button
							className="block md:hidden text-blue-500 text-sm mt-2"
							onClick={() => setShowLoginForm(true)}>
							Déjà inscrit ?
						</button>
						<button
							className="button bg-dark-blue-2 hover:bg-dark-purple mt-2 sm:mt-3 md:mt-5 text-sm sm:text-base md:text-lg"
							disabled={isSubmitting}
							type="submit">
							{isSubmitting ? 'En cours...' : "S'inscrire"}
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SignupForm;
