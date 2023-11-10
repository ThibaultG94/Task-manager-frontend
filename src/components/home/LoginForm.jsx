import React, { useState } from 'react';
import useHandleChange from './utils/login/handleChange';
import useHandleSubmit from './utils/login/handleSubmit';
import ErrorLogin from './utils/login/ErrorLogin';
import EmailLogin from './utils/login/EmailLogin';
import PasswordLogin from './utils/login/PasswordLogin';

const LoginForm = () => {
	const [errorCode, setErrorCode] = useState(null);
	const [displayErrors, setDisplayErrors] = useState(false);
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: null,
		password: null,
	});

	const handleChange = useHandleChange({ setFormData });
	const handleSubmit = useHandleSubmit({
		formData,
		setDisplayErrors,
		setError,
		setErrorCode,
	});

	return (
		<section className="flex justify-center px-20 py-8 text-light-blue">
			<div>
				<h2 className="mb-8 text-3xl text-center">Connexion</h2>

				<form
					className="flex flex-col items-start"
					onSubmit={handleSubmit}>
					<EmailLogin
						errors={errors}
						formData={formData}
						handleChange={handleChange}
					/>

					<PasswordLogin
						errors={errors}
						formData={formData}
						handleChange={handleChange}
					/>

					{displayErrors && (
						<ErrorLogin
							error={error}
							setErrors={setErrors}
							errorCode={errorCode}
						/>
					)}

					<div className="w-full flex justify-end">
						<button
							className="button bg-light-blue hover:bg-light-blue-3 mt-5 mb-4 text-dark-blue"
							type="submit">
							Se connecter
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default LoginForm;
