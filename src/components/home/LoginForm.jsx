import React, { useState } from 'react';
import useHandleChange from './utils/login/handleChange';
import useHandleSubmit from './utils/login/handleSubmit';
import ErrorLogin from './utils/login/ErrorLogin';
import EmailLogin from './utils/login/EmailLogin';
import PasswordLogin from './utils/login/PasswordLogin';
import PasswordResetModal from './PasswordResetModal';
import { toast } from 'react-toastify';

const LoginForm = () => {
	const [errorCode, setErrorCode] = useState(null);
	const [displayErrors, setDisplayErrors] = useState(false);
	const [error, setError] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleResetPassword = (email) => {
		handleCloseModal();
		toast.success(
			"Un email de réinitialisation vous a été envoyé à l'adresse " +
				email
		);
	};

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
						handleOpenModal={handleOpenModal}
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

			<PasswordResetModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onReset={handleResetPassword}
			/>
		</section>
	);
};

export default LoginForm;
