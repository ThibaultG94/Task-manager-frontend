import React, { useState } from 'react';

const PasswordResetModal = ({ isOpen, onClose, onReset }) => {
	const [email, setEmail] = useState('');

	const handleOutsideClick = (e) => {
		if (e.target.id === 'modalBackdrop') {
			onClose();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onReset(email);
		setEmail('');
	};

	if (!isOpen) return null;

	return (
		<div
			className="bg-black bg-opacity-50 fixed flex inset-0 items-center justify-center"
			id="modalBackdrop"
			onClick={handleOutsideClick}>
			<div
				className="bg-white p-6 rounded-lg relative shadow text-black"
				onClick={(e) => e.stopPropagation()}>
				<div className="flex justify-between mb-4">
					<h2 className="font-medium mr-8 text-gray-900 text-xl">
						Réinitialiser le mot de passe
					</h2>
					<button className="text-gray-600 text-sm" onClick={onClose}>
						Fermer
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<input
						className="border mb-4 p-2 w-full"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Entrez votre email"
						required
						type="email"
						value={email}
					/>
					<div className="flex justify-end">
						<button
							className="bg-blue-500 button hover:bg-blue-600"
							type="submit">
							Envoyer
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PasswordResetModal;
