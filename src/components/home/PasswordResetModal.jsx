import React, { useState } from 'react';

const PasswordResetModal = ({ isOpen, onClose, onReset }) => {
	const [email, setEmail] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onReset(email);
	};

	if (!isOpen) return null;

	return (
		<div className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow text-black">
				<h2 className="font-semibold mb-4 text-lg">
					Réinitialiser le mot de passe
				</h2>
				<form onSubmit={handleSubmit}>
					<input
						className="border mb-4 p-2 w-full"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Entrez votre email"
						required
						type="email"
						value={email}
					/>
					<button
						className="bg-blue-500 p-2 rounded text-white w-full"
						type="submit">
						Envoyer
					</button>
					<button
						className="mt-4 text-gray-600 text-sm"
						onClick={onClose}>
						Fermer
					</button>
				</form>
			</div>
		</div>
	);
};

export default PasswordResetModal;
