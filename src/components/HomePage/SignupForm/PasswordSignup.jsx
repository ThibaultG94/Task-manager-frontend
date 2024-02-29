import React, { useEffect, useState } from 'react';

const PasswordSignup = ({
	inputsFormErrors,
	inputsFormValues,
	handleInputChange,
	progressBar,
}) => {
	const [passwordStrength, setPasswordStrength] = useState(0);

	const evaluatePasswordStrength = (password) => {
		let strength = 0;
		const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[\d])(?=.*?[\W]).{8,}$/;

		if (password.length >= 8) strength += 25;
		if (password.match(/[a-z]+/)) strength += 25;
		if (password.match(/[A-Z]+/)) strength += 25;
		if (password.match(/[0-9]+/)) strength += 25;
		if (password.match(/[\W]+/)) strength += 25;

		if (!password.match(regex)) {
			strength -= 50;
		}

		return Math.max(Math.min(strength, 100), 0);
	};

	const progressBarColor = (strength) => {
		if (strength < 50) return 'bg-red-500';
		if (strength < 75) return 'bg-yellow-500';
		if (strength < 100) return 'bg-blue-500';
		return 'bg-green-500';
	};

	useEffect(() => {
		setPasswordStrength(
			evaluatePasswordStrength(inputsFormValues.password)
		);
	}, [inputsFormValues.password]);

	return (
		<div className="flex flex-col w-full">
			<label
				className="block text-gray-800 text-sm md:text-base"
				htmlFor="password">
				Mot de passe
			</label>

			<input
				autoComplete="off"
				className={`appearance-none border focus:border-blue-300 w-full h-9 mt-2 px-2 rounded-lg shadow text-base transition-colors ${
					inputsFormErrors.password &&
					'border-red-500 text-red-600 focus:border-red-500'
				}`}
				id="signupPassword"
				maxLength="128"
				minLength="8"
				name="password"
				onChange={(e) => handleInputChange(e)}
				required
				type="password"
				value={inputsFormValues.password}
			/>
			<span className={progressBar}></span>

			<div className="bg-gray-200 h-2.5 mt-2 rounded-full w-full">
				<div
					className={
						progressBarColor(passwordStrength) +
						' h-2.5 rounded-full'
					}
					style={{ width: `${passwordStrength}%` }}></div>
			</div>

			<span className="h-9 my-1 text-red-400 text-sm max-w-full">
				{inputsFormErrors.password}
			</span>
		</div>
	);
};

export default PasswordSignup;
