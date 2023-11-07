import React, { useEffect, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';
import { useRegisterUser } from '../../api/registerUser';
import {
	pseudoChecker,
	emailChecker,
	passwordChecker,
	confirmChecker,
} from '../utils/formValidation';

const SignupForm = ({ closeModal, modalRef }) => {
	const registerUser = useRegisterUser();

	const [formData, setFormData] = useState({
		pseudo: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const [errors, setErrors] = useState({
		pseudo: null,
		email: null,
		password: null,
		passwordConfirm: null,
	});

	const [isTypingPassword, setIsTypingPassword] = useState(false);
	const [isTypingPasswordConfirm, setIsTypingPasswordConfirm] =
		useState(false);
	const [progressBar, setProgressBar] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const storedFormData = JSON.parse(
			localStorage.getItem('signupFormData')
		);
		if (storedFormData) {
			setFormData(storedFormData);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('signupFormData', JSON.stringify(formData));
	}, [formData]);

	const debouncedPasswordChecker = useDebounce(passwordChecker, 400);
	const debouncedConfirmChecker = useDebounce(confirmChecker, 500);

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			formData.pseudo &&
			formData.email &&
			formData.password &&
			formData.passwordConfirm &&
			!errors.password &&
			!errors.passwordConfirm
		) {
			setIsSubmitting(true);
			registerUser(formData.pseudo, formData.email, formData.password);
			setFormData({
				pseudo: '',
				email: '',
				password: '',
				passwordConfirm: '',
			});
			setProgressBar('');
			setIsSuccess(true);
			localStorage.removeItem('signupFormData');
		} else {
			alert('Veuillez remplir correctement les champs');
		}
	};

	useEffect(() => {
		if (!isTypingPassword && !isTypingPasswordConfirm) {
			setErrors({
				pseudo: pseudoChecker(formData.pseudo),
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
		<section className="modal" id="signup-modal">
			<div className="modal-content" ref={modalRef}>
				<span
					className="close-button"
					id="close-button"
					onClick={closeModal}>
					&times;
				</span>
				<h2>Inscription</h2>

				<form id="signup-form" className="signup-form mx-auto">
					<div>
						<label htmlFor="pseudo">Nom d'utilisateur</label>
						<input
							type="text"
							id="pseudo"
							name="pseudo"
							required
							minLength="3"
							maxLength="30"
							autoComplete="off"
							placeholder="Entrez votre nom d'utilisateur"
							onChange={(e) => handleChange(e)}
							value={formData.pseudo}
						/>
					</div>

					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							maxLength="254"
							minLength="6"
							required
							autoComplete="off"
							placeholder="prenom.nom@email.fr"
							onChange={(e) => handleChange(e)}
							value={formData.email}
						/>
					</div>

					<div
						className={`password-container ${
							errors.password
								? 'error'
								: isSuccess
								? 'success'
								: ''
						}`}>
						<label htmlFor="password">Mot de passe</label>
						<input
							type="password"
							name="password"
							id="password"
							className="mt-3 mb-[-3px]"
							placeholder="Entrez votre mot de passe"
							minLength="8"
							maxLength="128"
							autoComplete="off"
							required
							onChange={(e) => handleChange(e)}
							value={formData.password}
						/>
						{isTypingPassword ? (
							isTypingPassword && (
								<p
									id="progress-bar"
									className={progressBar}></p>
							)
						) : (
							<p id="no-bar"></p>
						)}
						<span className="error-password">
							{errors.password}
						</span>
					</div>

					<div
						className={`confirm-container ${
							errors.passwordConfirm
								? 'error'
								: isSuccess
								? 'success'
								: ''
						}`}>
						<label htmlFor="passwordConfirm">
							Confirmez le mot de passe
						</label>
						<input
							type="password"
							name="passwordConfirm"
							id="confirm"
							placeholder="Confirmez votre mot de passe"
							minLength="8"
							maxLength="128"
							autoComplete="off"
							required
							onChange={(e) => handleChange(e)}
							value={formData.passwordConfirm}
						/>
						<span className="error-password">
							{errors.passwordConfirm}
						</span>
					</div>

					<button
						type="submit"
						className="button bg-dark-blue hover:bg-dark-blue-2 mt-5	"
						onClick={(e) => handleSubmit(e)}
						disabled={isSubmitting}>
						{isSubmitting ? 'En cours...' : "S'inscrire"}
					</button>
					<div
						className={`success-container ${
							isSuccess ? 'success' : ''
						}`}>
						<span id="success-register">Inscription validée !</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SignupForm;
