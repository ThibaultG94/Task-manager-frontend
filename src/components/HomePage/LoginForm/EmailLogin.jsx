import React from 'react';

const EmailLogin = ({
	inputsFormErrors,
	inputsFormValues,
	handleLoginInputChange,
	errorCount,
}) => {
	return (
		<div className="flex flex-col w-full">
			<label className="block text-sm md:text-base" htmlFor="email">
				Email
			</label>
			<input
				className={`appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base text-black transition-colors w-full ${inputsFormErrors.email ? 'error-animation' : ''}`}
				key={`password-${errorCount}`}
				id="email"
				maxLength="254"
				minLength="6"
				name="email"
				onChange={(e) => handleLoginInputChange(e)}
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

export default EmailLogin;
