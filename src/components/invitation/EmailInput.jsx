import React from 'react';

const EmailInput = ({ email, setEmail, errors }) => {
	return (
		<div className="mb-2 sm:mb-4 md:mb-5">
			<input
				className="appearance-none bg-white block border border-gray-300 hover:border-gray-500 focus:outline-none focus:shadow-outline leading-tight p-2 rounded shadow w-full"
				maxLength="50"
				name="email"
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Saisissez l'addresse email du contact"
				required
				type="email"
				value={email}
			/>
			<span className="h-6 my-2 text-red-400 text-xs md:text-sm">
				{errors.email}
			</span>
		</div>
	);
};

export default EmailInput;
