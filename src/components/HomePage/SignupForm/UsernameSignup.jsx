import React from 'react';

const UsernameSignup = ({
	inputsFormErrors,
	inputsFormValues,
	handleInputChange,
}) => {
	return (
		<div className="flex flex-col w-full">
			<label
				className="block text-sm md:text-base text-gray-800"
				htmlFor="username">
				Nom d'utilisateur
			</label>
			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors w-full ${
					inputsFormErrors.username &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="signupUsername"
				maxLength="30"
				minLength="3"
				name="username"
				onChange={(e) => handleInputChange(e)}
				required
				type="text"
				value={inputsFormValues.username}
			/>
			<span className="h-6 my-1 text-red-400 text-xs md:text-sm">
				{inputsFormErrors.username}
			</span>
		</div>
	);
};

export default UsernameSignup;
