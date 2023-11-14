import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPassword } from '../api/resetPassword';
import { toast } from 'react-toastify';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { token } = useParams();
	const resetPassword = useResetPassword();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await resetPassword(token, password);
			navigate('/');
			toast.success('Votre mot de passe a bien été réinitialisé');
		} catch (error) {
			console.error('Password reset error', error);
			toast.error(
				'Une erreur est survenue lors de la réinitialisation du mot de passe'
			);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					autoComplete="off"
					minLength="6"
					maxLength="254"
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Nouveau mot de passe"
					required
					type="password"
					value={password}
				/>
				<br />
				<button type="submit">Réinitialiser le mot de passe</button>
			</form>
		</div>
	);
};

export default ResetPassword;
