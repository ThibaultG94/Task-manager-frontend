import React from 'react';

const ResetPassword = () => {
	return (
		<div>
			<h1>Mot de passe oublié</h1>
			<p>
				Entrez votre adresse email et nous vous enverrons un lien
				(incessamment sous peu) pour réinitialiser votre mot de passe.
			</p>
			<form id="forget-form">
				<label for="email">Adresse E-mail:</label>
				<br />
				<input
					type="email"
					id="email"
					name="email"
					minlength="6"
					maxlength="254"
					autocomplete="off"
					required
				/>
				<br />
				<button type="submit">Envoyer</button>
			</form>
			<span id="text-forget"></span>
		</div>
	);
};

export default ResetPassword;
