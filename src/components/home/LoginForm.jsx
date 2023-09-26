import React from 'react';

const LoginForm = () => {
	return (
		<section className="flex justify-center px-20 py-10 bg-light-blue">
			<div>
				<h2 className="text-3xl my-10 text-center">Connexion</h2>
				<form
					id="login-form"
					className="flex flex-col items-start mb-24">
					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="emailLog"
							name="email"
							minLength="6"
							maxLength="254"
							autoComplete="off"
							required
						/>
						<span id="email-error" className="error-message"></span>
					</div>

					<div>
						<div>
							<div className="flex justify-between">
								<label htmlFor="password">Mot de passe</label>
								{/* <a href="./auth/forgetPassword.html">
											Mot de passe oublié
										</a> */}
							</div>
							<input
								type="password"
								id="passwordLog"
								name="password"
								minLength="8"
								maxLength="128"
								autoComplete="off"
								required
							/>
						</div>
						<span
							id="password-error"
							className="error-message"></span>
					</div>

					<button className="button" type="submit">
						Se connecter
					</button>
				</form>
				<p className="text-center">
					Pas encore inscrit ?{' '}
					<a href="#" id="signup-link">
						S'inscrire
					</a>
				</p>
			</div>
		</section>
	);
};

export default LoginForm;
