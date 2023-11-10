import React from 'react';

const ConfirmPasswordSignup = ({ errors, formData, handleChange }) => {
	return (
		<div className="flex flex-col">
			<label
				className="block text-md text-gray-800"
				htmlFor="passwordConfirm">
				Confirmez le mot de passe
			</label>
			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
					errors.passwordConfirm &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="passwordConfirm"
				maxLength="128"
				minLength="8"
				name="passwordConfirm"
				onChange={(e) => handleChange(e)}
				required
				type="password"
				value={formData.passwordConfirm}
			/>
			<span className="h-6 my-1 text-red-400 text-sm">
				{errors.passwordConfirm}
			</span>
		</div>
	);
};

export default ConfirmPasswordSignup;
