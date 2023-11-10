import React, { useState } from 'react';

const LoginForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: null,
		password: null,
	});
	return (
		<section className="flex justify-center px-20 py-8 text-light-blue">
			<div>
				<h2 className="mb-8 text-3xl text-center">Connexion</h2>

				<form className="flex flex-col items-start">
					<div className="flex flex-col">
						<label className="text-md" htmlFor="email">
							Email
						</label>
						<input
							className={`appearance-none border focus:border-green-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base text-black transition-colors ${
								errors.email &&
								'border-red-500 text-red-600 focus:border-red-500'
							}`}
							id="email"
							maxLength="254"
							minLength="6"
							name="email"
							required
							type="email"
							value={formData.email}
						/>
						<span className="h-6 my-1 text-red-400 text-sm">
							{errors.email}
						</span>
					</div>

					<div className="flex flex-col">
						<div className="flex justify-between">
							<label className="text-md" htmlFor="password">
								Mot de passe
							</label>
							{/* <a href="./auth/forgetPassword.html">
											Mot de passe oublié
										</a> */}
						</div>
						<input
							className={`appearance-none border focus:border-green-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base text-black transition-colors ${
								errors.password &&
								'border-red-500 text-red-600 focus:border-red-500'
							}`}
							id="password"
							maxLength="128"
							minLength="8"
							name="password"
							required
							type="password"
							value={formData.password}
						/>
						<span className="h-6 my-1 text-red-400 text-sm max-w-[350px]">
							{errors.password}
						</span>
					</div>

					<div className="w-full flex justify-end">
						<button
							className="button bg-light-blue hover:bg-light-blue-3 mt-5 mb-4 text-dark-blue"
							type="submit">
							Se connecter
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default LoginForm;
