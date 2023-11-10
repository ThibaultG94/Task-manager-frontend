import React from 'react';
import CloseButton from '../modal/CloseButton';

const SignupForm = ({ closeModal, modalRef }) => {
	return (
		<section className="modal-2 fixed z-10 left-0 top-0 w-full h-full bg-modal-bg transition-all ease-in-out duration-300 text-black">
			<div
				className="absolute z-10 top-[46%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-7 px-5 rounded-md w-[52vw]"
				ref={modalRef}>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-bold text-gray-700">
						Inscription
					</h2>
					<CloseButton onClose={closeModal} />
				</div>

				<form className="signup-form mx-auto">
					<div className="mb-4">
						<label
							htmlFor="pseudo"
							className="block text-sm font-medium text-gray-700">
							Nom d'utilisateur
						</label>
						<input
							type="text"
							id="pseudo"
							name="pseudo"
							required
							minLength="3"
							maxLength="30"
							autoComplete="off"
							placeholder="Entrez votre nom d'utilisateur"
							onChange={(e) => handleChange(e)}
							value={formData.pseudo}
							className={`h-9 shadow appearance-none border rounded-lg text-base px-2 transition-colors focus:border-green-300 mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
								errors.pseudo && 'border-red-500 text-red-600'
							}`}
						/>
					</div>

					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							maxLength="254"
							minLength="6"
							required
							autoComplete="off"
							placeholder="prenom.nom@email.fr"
							onChange={(e) => handleChange(e)}
							value={formData.email}
							className={`h-9 shadow appearance-none border rounded-lg text-base px-2 transition-colors focus:border-green-300 mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
								errors.email && 'border-red-500 text-red-600'
							}`}
						/>
					</div>

					<div
						className={`password-container mb-4 ${
							errors.password
								? 'border border-red-500'
								: isSuccess
								? 'border border-green-500'
								: 'border border-gray-300'
						}`}>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700">
							Mot de passe
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Entrez votre mot de passe"
							minLength="8"
							maxLength="128"
							autoComplete="off"
							required
							onChange={(e) => handleChange(e)}
							value={formData.password}
							className={`h-9 shadow appearance-none border rounded-lg text-base px-2 transition-colors focus:border-green-300 mt-2 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
								errors.password
									? 'border-red-500 text-red-600'
									: 'border-gray-300'
							}`}
						/>
						{isTypingPassword && (
							<div className="relative pt-1">
								<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
									<div
										style={{ width: '30%' }}
										className="h-1 bg-red-500"></div>
									<div
										style={{ width: '60%' }}
										className="h-1 bg-yellow-500"></div>
									<div
										style={{ width: '100%' }}
										className="h-1 bg-green-500"></div>
								</div>
							</div>
						)}
						<span
							className={`text-xs ${
								errors.password
									? 'text-red-500 visible'
									: 'text-green-500 visible'
							}`}>
							{errors.password}
						</span>
					</div>

					<div
						className={`confirm-container mb-4 ${
							errors.passwordConfirm
								? 'border border-red-500'
								: isSuccess
								? 'border border-green-500'
								: 'border border-gray-300'
						}`}>
						<label
							htmlFor="passwordConfirm"
							className="block text-sm font-medium text-gray-700">
							Confirmez le mot de passe
						</label>
						<input
							type="password"
							name="passwordConfirm"
							id="confirm"
							placeholder="Confirmez votre mot de passe"
							minLength="8"
							maxLength="128"
							autoComplete="off"
							required
							onChange={(e) => handleChange(e)}
							value={formData.passwordConfirm}
							className={`h-9 shadow appearance-none border rounded-lg text-base px-2 transition-colors focus:border-green-300 mt-2 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
								errors.passwordConfirm
									? 'border-red-500 text-red-600'
									: 'border-gray-300'
							}`}
						/>
						<span
							className={`text-xs ${
								errors.passwordConfirm
									? 'text-red-500 visible'
									: 'text-green-500 visible'
							}`}>
							{errors.passwordConfirm}
						</span>
					</div>

					<div className="flex justify-end">
						<button
							type="submit"
							className="button bg-dark-blue hover:bg-dark-blue-2 mt-5"
							onClick={(e) => handleSubmit(e)}
							disabled={isSubmitting}>
							{isSubmitting ? 'En cours...' : "S'inscrire"}
						</button>
					</div>
					<div
						className={`success-container ${
							isSuccess ? 'visible' : 'invisible'
						}`}>
						<span className="text-green-500 pt-80 text-2xl">
							Inscription validée !
						</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SignupForm;
