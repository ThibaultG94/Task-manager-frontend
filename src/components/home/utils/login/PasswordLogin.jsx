import React from 'react';

const PasswordLogin = ({ errors, formData, handleChange }) => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-between">
				<label className="text-md" htmlFor="password">
					Mot de passe
				</label>
				<span className="italic cursor-pointer">
					Mot de passe oublié
				</span>
			</div>
			<input
				className={`appearance-none border focus:border-blue-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base text-black transition-colors ${
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
			<span className="h-6 my-1 text-red-400 text-sm max-w-[350px]">
				{errors.password}
			</span>
		</div>
	);
};

export default PasswordLogin;
