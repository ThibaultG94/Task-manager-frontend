import React from 'react';

const UsernameSignup = ({ errors, formData, handleChange }) => {
	return (
		<div className="flex flex-col">
			<label className="block text-md text-gray-800" htmlFor="username">
				Nom d'utilisateur
			</label>
			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
					errors.username &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="username"
				maxLength="30"
				minLength="3"
				name="username"
				onChange={(e) => handleChange(e)}
				required
				type="text"
				value={formData.username}
			/>
			<span className="h-6 my-1 text-red-400 text-sm">
				{errors.username}
			</span>
		</div>
	);
};

export default UsernameSignup;
