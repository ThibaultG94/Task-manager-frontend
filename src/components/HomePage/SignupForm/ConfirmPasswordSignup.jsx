import React from 'react';

const ConfirmPasswordSignup = ({
	inputsFormErrors,
	inputsFormValues,
	handleInputChange,
}) => {
	return (
		<div className="flex flex-col w-full">
			<label
				className="block text-gray-800 text-sm md:text-base"
				htmlFor="confirmPassword">
				Confirmez le mot de passe
			</label>
			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 w-full h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
					inputsFormErrors.confirmPassword &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="signupConfirmPassword"
				maxLength="128"
				minLength="8"
				name="confirmPassword"
				onChange={(e) => handleInputChange(e)}
				required
				type="password"
				value={inputsFormValues.confirmPassword}
			/>
			<span className="h-6 my-1 text-red-400 text-sm max-w-full">
				{inputsFormErrors.confirmPassword}
			</span>
		</div>
	);
};

export default ConfirmPasswordSignup;
