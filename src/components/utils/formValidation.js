export const pseudoChecker = (value) => {
	if (value.length < 3) {
		return 'Le pseudo doit comporter au moins 3 caractères';
	}
	return '';
};

export const emailChecker = (value) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value)) {
		return 'Adresse e-mail invalide';
	}
	return '';
};

export const passwordChecker = (value, setErrors, setProgressBar) => {
	const regex =
		/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

	if (!value.match(regex)) {
		setErrors((prevErrors) => ({
			...prevErrors,
			password:
				'Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial',
		}));
		setProgressBar('progressRed');
	} else if (value.length < 12) {
		setErrors((prevErrors) => ({
			...prevErrors,
			password: 'Sécurité moyenne',
		}));
		setProgressBar('progressBlue');
	} else {
		setErrors((prevErrors) => ({
			...prevErrors,
			password: null,
		}));
		setProgressBar('progressGreen');
	}
};

export const confirmChecker = (value, password) => {
	if (value === '') {
		return null;
	}
	if (value !== password) {
		return 'Les mots de passe ne correspondent pas';
	} else {
		return null;
	}
};
