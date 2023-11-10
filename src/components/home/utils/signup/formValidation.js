export const pseudoChecker = (value) => {
	if (value === '') {
		return null;
	}
	if (value.length < 3) {
		return 'Le pseudo doit comporter au moins 3 caractères';
	}
	return false;
};

export const emailChecker = (value) => {
	if (value === '') {
		return null;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(value)) {
		return 'Adresse e-mail invalide';
	}
	return false;
};

export const passwordChecker = (value, setErrors, setProgressBar) => {
	if (value === '') {
		return null;
	}
	const regex =
		/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;

	if (!value.match(regex)) {
		setProgressBar('progressRed');
		return 'Minimum de 8 caractères, une majuscule, un chiffre et un caractère spécial';
	} else if (value.length < 12) {
		setProgressBar('progressBlue');
		return 'Sécurité moyenne';
	} else {
		setProgressBar('progressGreen');
		return false;
	}
};

export const confirmChecker = (value, password) => {
	if (value === '') {
		return null;
	}
	if (value !== password) {
		return 'Les mots de passe ne correspondent pas';
	} else {
		return false;
	}
};

export const validateFormDataOnTyping = (
	formData,
	setErrors,
	setProgressBar
) => {
	setTimeout(() => {
		setErrors({
			username: pseudoChecker(formData.username),
			email: emailChecker(formData.email),
			password: passwordChecker(
				formData.password,
				setErrors,
				setProgressBar
			),
			passwordConfirm: confirmChecker(
				formData.passwordConfirm,
				formData.password
			),
		});
	}, 300);
};

export const validatePasswordConfirmOnTyping = (formData, setErrors) => {
	setErrors((prevErrors) => ({
		...prevErrors,
		passwordConfirm: confirmChecker(
			formData.passwordConfirm,
			formData.password
		),
	}));
};
