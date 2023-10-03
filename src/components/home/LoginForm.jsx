import React, { useState } from 'react';
import SignupLink from './SignupLink';
import { login } from '../../api/loginUser';
import ErrorLogin from '../utils/ErrorLogin';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const API_URL = process.env.REACT_APP_API_URL;
	const [errorCode, setErrorCode] = useState(null);
	const [displayErrors, setDisplayErrors] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: null,
		password: null,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (formData.email && formData.password) {
				const res = await login(
					API_URL,
					formData.email,
					formData.password
				);
				res.status === 200
					? navigate('/pages/dashboard')
					: setError(res);
			}
		} catch (error) {
			if (error.response) {
				setErrorCode(error.response.status);
				setError(error);
			} else {
				setErrorCode(null);
			}
			setDisplayErrors(true);
		}
	};

	return (
		<section className="flex justify-center px-20 py-10 bg-light-blue">
			<div>
				<h2 className="text-3xl my-10 text-center">Connexion</h2>
				<form
					id="login-form"
					className="flex flex-col items-start mb-24"
					onSubmit={handleSubmit}>
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
							onChange={handleChange}
							value={formData.email}
						/>
						<span id="email-error" className="error-message h-6">
							{errors.email}
						</span>
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
								onChange={handleChange}
								value={formData.password}
							/>
						</div>
						<span id="password-error" className="error-message h-6">
							{errors.password}
						</span>
					</div>

					{displayErrors && (
						<ErrorLogin
							error={error}
							setErrors={setErrors}
							errorCode={errorCode}
						/>
					)}

					<button className="button" type="submit">
						Se connecter
					</button>
				</form>
				<SignupLink />
			</div>
		</section>
	);
};

export default LoginForm;
