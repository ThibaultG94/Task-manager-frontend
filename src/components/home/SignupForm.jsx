import React, { useEffect, useState } from 'react';
import '../../style/components/modal.scss';

const useDebounce = (func, delay) => {
	let timer;
	return function (...args) {
		return new Promise((resolve) => {
			clearTimeout(timer);
			timer = setTimeout(async () => {
				const result = await func.apply(this, args);
				resolve(result);
			}, delay);
		});
	};
};

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

	const [progressBar, setProgressBar] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const pseudoChecker = (value) => {
		if (value.length < 3) {
			return 'Pseudo must be at least 3 characters long';
		}
		return '';
	};

	const emailChecker = (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			return 'Invalid email address';
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
		setFormData({ ...formData, [name]: value });

		if (name === 'password') {
			debouncedPasswordChecker(value);
		}

		if (name === 'passwordConfirm') {
			debouncedConfirmChecker(value, formData.password);
		}
	};

	useEffect(() => {
		setErrors({
			pseudo: pseudoChecker(formData.pseudo),
			email: emailChecker(formData.email),
			password: passwordChecker(formData.password),
			passwordConfirm: confirmChecker(formData.confirmChecker),
		});
	}, [formData]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.pseudo && formData.email && formData.password) {
			console.log(formData);
		} else {
			alert('Veuillez remplir tous les champs');
		}
	};

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

				<form id="signup-form" className="mx-auto">
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

					<div className="password-container">
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
						<p id="progress-bar" className={progressBar}></p>
						{errors.password && <span>{errors.password}</span>}
					</div>

					<div className="confirm-container">
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
						{errors.passwordConfirm && (
							<span>{errors.passwordConfirm}</span>
						)}
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
