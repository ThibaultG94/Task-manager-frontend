import React, { useState } from 'react';
import '../../style/components/modal.scss';

const SignupForm = ({ closeModal, modalRef }) => {
	const [formData, setFormData] = useState({
		pseudo: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});

	const [progressBar, setProgressBar] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const values = '';

		if (values.pseudo && values.email && values.password) {
			console.log(values);
		} else {
			alert('Veuillez remplir tous les champs');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
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
						<p id="progress-bar"></p>
						<span></span>
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
						<span></span>
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
