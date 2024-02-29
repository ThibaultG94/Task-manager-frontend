import React from 'react';

const EmailLogin = ({ errors, inputsFormValues, handleChange }) => {
	return (
		<div className="flex flex-col w-full">
			<label className="block text-sm md:text-base" htmlFor="email">
				Email
			</label>
			<input
				className={`appearance-none border focus:border-blue-300 h-9 mt-2 px-2 rounded-lg shadow text-base text-black transition-colors w-full ${
					errors.email &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="email"
				maxLength="254"
				minLength="6"
				name="email"
				onChange={(e) => handleChange(e)}
				required
				type="email"
				value={inputsFormValues.email}
			/>
			<span className="h-6 my-1 text-red-400 text-xs md:text-sm">
				{errors.email}
			</span>
		</div>
	);
};

export default EmailLogin;
