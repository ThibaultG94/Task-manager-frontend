import React, { useEffect, useState } from 'react';
import useHandleChange from './utils/signup/handleChange';
import {
	validateFormDataOnTyping,
	validatePasswordConfirmOnTyping,
} from './utils/signup/formValidation';
import useHandleSubmit from './utils/signup/handleSubmit';
import UsernameSignup from './utils/signup/UsernameSignup';
import EmailSignup from './utils/signup/EmailSignup';
import PasswordSignup from './utils/signup/PasswordSignup';
import ConfirmPasswordSignup from './utils/signup/ConfirmPasswordSignup';

const SignupForm = ({ setShowLoginForm }) => {
	const [errors, setErrors] = useState({
		username: null,
		email: null,
		password: null,
		passwordConfirm: null,
	});
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const [isTypingPassword, setIsTypingPassword] = useState(false);
	const [isTypingPasswordConfirm, setIsTypingPasswordConfirm] =
		useState(false);
	const [progressBar, setProgressBar] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = useHandleChange({
		formData,
		setErrors,
		setFormData,
		setIsTypingPassword,
		setIsTypingPasswordConfirm,
		setProgressBar,
	});
	const handleSubmit = useHandleSubmit({
		errors,
		formData,
		setFormData,
		setIsSubmitting,
		setProgressBar,
	});

	useEffect(() => {
		if (!isTypingPassword && !isTypingPasswordConfirm) {
			validateFormDataOnTyping(formData, setErrors, setProgressBar);
		} else if (!isTypingPassword) {
			validatePasswordConfirmOnTyping(formData, setErrors);
		} else {
			return;
		}
		setIsTypingPassword(false);
		setIsTypingPasswordConfirm(false);
	}, [formData, isTypingPassword, isTypingPasswordConfirm]);

	useEffect(() => {
		if (isTypingPasswordConfirm && !isTypingPassword) {
			validatePasswordConfirmOnTyping(formData, setErrors);
		}
		setIsTypingPassword(false);
		setIsTypingPasswordConfirm(false);
	}, [formData.password, formData.passwordConfirm, isTypingPassword]);

	return (
		<section className="bg-light-blue flex h-screen justify-center py-4 sm:py-6 md:py-8 text-dark-blue">
			<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg sm:w-72 md:w-80 lg:w-96">
				<h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl text-center">
					Inscription
				</h2>

				<form
					className="flex flex-col items-start"
					onSubmit={async (e) => await handleSubmit(e)}>
					<UsernameSignup
						errors={errors}
						formData={formData}
						handleChange={handleChange}
					/>

					<EmailSignup
						errors={errors}
						formData={formData}
						handleChange={handleChange}
					/>

					<PasswordSignup
						errors={errors}
						formData={formData}
						handleChange={handleChange}
						progressBar={progressBar}
					/>

					<ConfirmPasswordSignup
						errors={errors}
						formData={formData}
						handleChange={handleChange}
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
