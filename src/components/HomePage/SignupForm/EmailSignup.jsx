import React from 'react';

const EmailSignup = ({
	inputsFormErrors,
	inputsFormValues,
	handleInputChange,
}) => {
	return (
		<div className="flex flex-col w-full">
			<label
				className="block text-gray-800 text-sm md:text-base"
				htmlFor="email">
				Email
			</label>
			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors w-full ${
					inputsFormErrors.email &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="signupEmail"
				maxLength="254"
				minLength="6"
				name="email"
				onChange={(e) => handleInputChange(e)}
				required
				type="email"
				value={inputsFormValues.email}
			/>
			<span className="h-6 my-1 text-red-400 text-xs md:text-sm">
				{inputsFormErrors.email}
			</span>
		</div>
	);
};

export default EmailSignup;
