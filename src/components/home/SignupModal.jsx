import React from 'react';
import '../../style/components/modal.scss';

const SignupModal = () => {
	return (
		<section className="modal" id="signup-modal">
			<div className="modal-content">
				<span className="close-button" id="close-button">
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
						/>
						<span></span>
					</div>

					<button type="submit">S'inscrire</button>
					<div className="success-container">
						<span id="success-register">Inscription validée !</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SignupModal;
