import React, { useEffect, useState } from 'react';
import useHandleChange from './utils/signup/handleChange';
import {
	confirmChecker,
	emailChecker,
	passwordChecker,
	pseudoChecker,
} from '../utils/formValidation';
import useHandleSubmit from './utils/signup/handleSubmit';

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
			setTimeout(() => {
				setErrors({
					username: pseudoChecker(formData.username),
					email: emailChecker(formData.email),
					password: passwordChecker(
						formData.password,
						setErrors,
						setProgressBar
					),
					passwordConfirm: confirmChecker(
						formData.passwordConfirm,
						formData.password
					),
				});
				setIsTypingPassword(false);
				setIsTypingPasswordConfirm(false);
			}, 300);
		} else if (!isTypingPassword) {
			setErrors((prevErrors) => ({
				...prevErrors,
				passwordConfirm: confirmChecker(
					formData.passwordConfirm,
					formData.password
				),
			}));
			setIsTypingPassword(false);
			setIsTypingPasswordConfirm(false);
		}
	}, [formData, isTypingPassword, isTypingPasswordConfirm]);

	useEffect(() => {
		if (isTypingPasswordConfirm && !isTypingPassword) {
			setErrors((prevErrors) => ({
				...prevErrors,
				passwordConfirm: confirmChecker(
					formData.passwordConfirm,
					formData.password
				),
			}));
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
					<div className="flex flex-col">
						<label
							className="block text-md text-gray-800"
							htmlFor="username">
							Nom d'utilisateur
						</label>
						<input
							autoComplete="off"
							className={`appearance-none border focus:border-green-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
								errors.username &&
								'border-red-500 text-red-600 focus:border-red-500'
							}`}
							id="username"
							maxLength="30"
							minLength="3"
							name="username"
							onChange={(e) => handleChange(e)}
							required
							type="text"
							value={formData.username}
						/>
						<span className="h-6 my-1 text-red-400 text-sm">
							{errors.username}
						</span>
					</div>

					<div className="flex flex-col">
						<label
							className="block text-gray-800 text-md"
							htmlFor="email">
							Email
						</label>
						<input
							autoComplete="off"
							className={`appearance-none border focus:border-green-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
								errors.email &&
								'border-red-500 text-red-600 focus:border-red-500'
							}`}
							id="email"
							maxLength="254"
							minLength="6"
							name="email"
							onChange={(e) => handleChange(e)}
							required
							type="email"
							value={formData.email}
						/>
						<span className="h-6 my-1 text-red-400 text-sm">
							{errors.email}
						</span>
					</div>

					<div className="flex flex-col">
						<label
							className="block text-md text-gray-800"
							htmlFor="password">
							Mot de passe
						</label>

						<input
							autoComplete="off"
							className={`appearance-none border focus:border-green-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
								errors.password &&
								'border-red-500 text-red-600 focus:border-red-500'
							}`}
							id="password"
							maxLength="128"
							minLength="8"
							name="password"
							onChange={(e) => handleChange(e)}
							required
							type="password"
							value={formData.password}
						/>
						<span className={progressBar}></span>
						{/* {isTypingPassword && (
							<div className="relative pt-1">
								<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
									<div
										style={{ width: '30%' }}
										className="h-1 bg-red-500"></div>
									<div
										style={{ width: '60%' }}
										className="h-1 bg-yellow-500"></div>
									<div
										style={{ width: '100%' }}
										className="h-1 bg-green-500"></div>
								</div>
							</div>
						)} */}
						<span className="h-9 my-1 text-red-400 text-sm max-w-[350px]">
							{errors.password}
						</span>
					</div>

					<div className="flex flex-col">
						<label
							className="block text-md text-gray-800"
							htmlFor="passwordConfirm">
							Confirmez le mot de passe
						</label>
						<input
							autoComplete="off"
							className={`appearance-none border focus:border-green-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
								errors.passwordConfirm &&
								'border-red-500 text-red-600 focus:border-red-500'
							}`}
							id="passwordConfirm"
							maxLength="128"
							minLength="8"
							name="passwordConfirm"
							onChange={(e) => handleChange(e)}
							required
							type="password"
							value={formData.passwordConfirm}
						/>
						<span className="h-6 my-1 text-red-400 text-sm">
							{errors.passwordConfirm}
						</span>
					</div>

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
