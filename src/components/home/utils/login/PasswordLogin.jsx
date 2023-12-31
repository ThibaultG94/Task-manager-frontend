import React from 'react';

const PasswordLogin = ({ errors, formData, handleChange, handleOpenModal }) => {
	return (
		<div className="flex flex-col w-full">
			<div className="flex justify-between">
				<label
					className="block text-sm md:text-base"
					htmlFor="password">
					Mot de passe
				</label>
				<span
					className="cursor-pointer italic text-sm md:text-base"
					onClick={handleOpenModal}>
					Mot de passe oublié ?
				</span>
			</div>
			<input
				className={`appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base text-black transition-colors w-full ${
					errors.password &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="password"
				maxLength="128"
				minLength="8"
				name="password"
				onChange={(e) => handleChange(e)}
				required
				type="password"
				value={formData.password}
			/>
			<span className="h-6 my-1 text-red-400 text-sm max-w-full">
				{errors.password}
			</span>
		</div>
	);
};

export default PasswordLogin;
