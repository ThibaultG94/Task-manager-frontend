import React, { useEffect, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';

const SignupForm = ({ closeModal, modalRef }) => {
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

	const pseudoChecker = (value) => {
		if (value.length < 3) {
			return 'Le pseudo doit comporter au moins 3 caractères';
		}
		return '';
	};

	const emailChecker = (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			return 'Adresse e-mail invalide';
		}
		return '';
	};

	const passwordChecker = (value) => {
		const regex =
			/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

		if (!value.match(regex)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password:
					'Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial',
			}));
			setProgressBar('progressRed');
		} else if (value.length < 12) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: 'Sécurité moyenne',
			}));
			setProgressBar('progressBlue');
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: null,
			}));
			setProgressBar('progressGreen');
		}
	};

	const confirmChecker = (value, password) => {
		if (value !== password) {
			console.log(value, password);
			setErrors((prevErrors) => ({
				...prevErrors,
				passwordConfirm: 'Les mots de passe ne correspondent pas',
			}));
		} else {
			setErrors((prevErrors) => ({
				...prevErrors,
				passwordConfirm: null,
			}));
		}
	};

	const debouncedPasswordChecker = useDebounce(passwordChecker, 400);
	const debouncedConfirmChecker = useDebounce(confirmChecker, 500);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => {
			const updatedFormData = { ...prevFormData, [name]: value };

			if (name === 'password') {
				debouncedPasswordChecker(value);
				setIsTypingPassword(true);
			}

			if (name === 'passwordConfirm') {
				debouncedConfirmChecker(value, updatedFormData.password);
				setIsTypingPasswordConfirm(true);
			}

			return updatedFormData;
		});

		setIsTypingPassword(false);
		setIsTypingPasswordConfirm(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.pseudo && formData.email && formData.password) {
			console.log(formData);
		} else {
			alert('Veuillez remplir tous les champs');
		}
	};

	useEffect(() => {
		if (!isTypingPassword && !isTypingPasswordConfirm) {
			setErrors({
				pseudo: pseudoChecker(formData.pseudo),
				email: emailChecker(formData.email),
				password: passwordChecker(formData.password),
				passwordConfirm: confirmChecker(
					formData.passwordConfirm,
					formData.password
				),
			});
		}
	}, [formData, isTypingPassword, isTypingPasswordConfirm]);

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
						/>
						<span className="error-password">
							{errors.passwordConfirm}
						</span>
					</div>

					<button type="submit" onClick={(e) => handleSubmit(e)}>
						S'inscrire
					</button>
					<div className="success-container">
						<span id="success-register">Inscription validée !</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SignupForm;
