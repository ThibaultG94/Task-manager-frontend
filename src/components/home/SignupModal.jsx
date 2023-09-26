import React from 'react';

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
						<label for="pseudo">Nom d'utilisateur</label>
						<input
							type="text"
							id="pseudo"
							name="pseudo"
							required
							minlength="3"
							maxlength="30"
							autocomplete="off"
							placeholder="Entrez votre nom d'utilisateur"
						/>
					</div>

					<div>
						<label for="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							maxlength="254"
							minlength="6"
							required
							autocomplete="off"
							placeholder="prenom.nom@email.fr"
						/>
					</div>

					<div className="password-container">
						<label for="password">Mot de passe</label>
						<input
							type="password"
							name="password"
							id="password"
							className="mt-3 mb-[-3px]"
							placeholder="Entrez votre mot de passe"
							minlength="8"
							maxlength="128"
							autocomplete="off"
							required
						/>
						<p id="progress-bar"></p>
						<span></span>
					</div>

					<div className="confirm-container">
						<label for="passwordConfirm">
							Confirmez le mot de passe
						</label>
						<input
							type="password"
							name="passwordConfirm"
							id="confirm"
							placeholder="Confirmez votre mot de passe"
							minlength="8"
							maxlength="128"
							autocomplete="off"
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
