import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '../api/users/useResetPassword';
import { toast } from 'react-toastify';

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const resetPassword = useResetPassword();
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [errors, setErrors] = useState({
		password: null,
		confirmPassword: null,
	});

	const validatePasswords = () => {
		let tempErrors = { ...errors };
		let isValid = true;

		if (password !== confirmPassword) {
			tempErrors.confirmPassword =
				'Les mots de passe ne correspondent pas';
			isValid = false;
		}

		if (password.length < 6) {
			tempErrors.password =
				'Le mot de passe doit contenir au moins 6 caractères';
			isValid = false;
		}

		setErrors(tempErrors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validatePasswords()) {
			try {
				await resetPassword(token, password);
				navigate('/home');
				toast.success('Votre mot de passe a bien été réinitialisé');
			} catch (error) {
				toast.error(
					'Une erreur est sur	venue lors de la réinitialisation du mot de passe'
				);
			}
		}
	};

	return (
		<div className="bg-light-blue flex items-center justify-center min-h-screen">
			<div className="bg-white max-w-lg p-8 rounded-lg shadow-md space-y-4 w-full">
				<h2 className="font-medium text-3xl text-dark-blue">
					Réinitialiser le mot de passe
				</h2>
				<form className="space-y-2" onSubmit={handleSubmit}>
					<div>
						<label
							className="block text-md text-gray-800"
							htmlFor="password">
							Nouveau mot de passe
						</label>
						<input
							autoComplete="off"
							className="appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors w-full"
							id="password"
							minLength="6"
							maxLength="254"
							onChange={(e) => setPassword(e.target.value)}
							required
							type="password"
							value={password}
						/>
						<span className="h-9 my-1 text-red-400 text-sm max-w-[350px]">
							{errors.password}
						</span>
					</div>
					<div>
						<label
							className="block text-md text-gray-800"
							htmlFor="confirmPassword">
							Confirmer le mot de passe
						</label>
						<input
							autoComplete="off"
							className="appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors w-full"
							id="confirmPassword"
							minLength="6"
							maxLength="254"
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							type="password"
							value={confirmPassword}
						/>
						<span className="h-9 my-1 text-red-400 text-sm max-w-[350px]">
							{errors.confirmPassword}
						</span>
					</div>
					<div className="flex justify-end">
						<button
							className="bg-dark-blue hover:bg-dark-purple mt-2 px-4 py-2 rounded-lg text-white"
							type="submit">
							Mettre à jour le mot de passe
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
