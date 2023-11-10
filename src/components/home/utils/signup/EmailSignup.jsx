import React from 'react';

const EmailSignup = ({ errors, formData, handleChange }) => {
	return (
		<div className="flex flex-col">
			<label className="block text-gray-800 text-md" htmlFor="email">
				Email
			</label>
			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
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
				value={formData.email}
			/>
			<span className="h-6 my-1 text-red-400 text-sm">
				{errors.email}
			</span>
		</div>
	);
};

export default EmailSignup;
