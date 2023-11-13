import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { token } = useParams();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(
				`http://backendurl/reset-password/${token}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ password }),
				}
			);

			if (response.ok) {
				navigate('/login');
			}
		} catch (error) {
			console.error('Password reset error', error);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					autocomplete="off"
					minlength="6"
					maxlength="254"
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
