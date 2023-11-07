import React, { useEffect, useState } from 'react';
import { useDebounce } from '../utils/useDebounce';
import { useRegisterUser } from '../../api/registerUser';
import {
	pseudoChecker,
	emailChecker,
	passwordChecker,
	confirmChecker,
} from '../utils/formValidation';
import CloseButton from '../modal/CloseButton';

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
		<section className="modal bg-modal-bg transition-all ease-in-out duration-300 text-black">
			<div
				className="absolute z-10 top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-7 px-5 rounded-md w-[52vw]"
				ref={modalRef}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold text-gray-700">
						Inscription
					</h2>
					<CloseButton onClose={closeModal} />
				</div>

				<form className="signup-form mx-auto">
					<div className="mb-4">
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

					<div className="mb-4">
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

					<div className="flex justify-end">
						<button
							type="submit"
							className="button bg-dark-blue hover:bg-dark-blue-2 mt-5	"
							onClick={(e) => handleSubmit(e)}
							disabled={isSubmitting}>
							{isSubmitting ? 'En cours...' : "S'inscrire"}
						</button>
					</div>
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
