import React from 'react';

const PasswordSignup = ({ errors, formData, handleChange, progressBar }) => {
	return (
		<div className="flex flex-col">
			<label className="block text-md text-gray-800" htmlFor="password">
				Mot de passe
			</label>

			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 w-[350px] h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
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
			<span className={progressBar}></span>
			{/* {isTypingPassword && (
							<div className="relative pt-1">
								<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-200">
									<div
										style={{ width: '30%' }}
										className="h-1 bg-red-500"></div>
									<div
										style={{ width: '60%' }}
										className="h-1 bg-yellow-500"></div>
									<div
										style={{ width: '100%' }}
										className="h-1 bg-green-500"></div>
								</div>
							</div>
						)} */}
			<span className="h-9 my-1 text-red-400 text-sm max-w-[350px]">
				{errors.password}
			</span>
		</div>
	);
};

export default PasswordSignup;
