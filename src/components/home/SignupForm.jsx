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

const SignupForm = () => {
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
		<section className="bg-light-blue flex justify-center px-20 py-8 text-dark-blue">
			<div>
				<h2 className="mb-8 text-3xl text-center">Inscription</h2>

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

					<div className="w-full flex justify-end">
						<button
							className="button bg-dark-blue-2 hover:bg-dark-purple mt-5 mb-4"
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
