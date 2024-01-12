import React, { useState } from 'react';
import useHandleChange from './utils/login/handleChange';
import useHandleSubmit from './utils/login/handleSubmit';
import ErrorLogin from './utils/login/ErrorLogin';
import EmailLogin from './utils/login/EmailLogin';
import PasswordLogin from './utils/login/PasswordLogin';
import PasswordResetModal from './PasswordResetModal';
import { useForgotPassword } from '../../api/users/forgotPassword';

const LoginForm = ({ setShowLoginForm }) => {
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

	const forgotPassword = useForgotPassword();
	const handleChange = useHandleChange({ setFormData });
	const handleSubmit = useHandleSubmit({
		formData,
		setDisplayErrors,
		setError,
		setErrorCode,
	});

	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	const handleResetPassword = async (email) => {
		await forgotPassword(email);
		handleCloseModal();
	};

	return (
		<section className="bg-dark-blue flex h-screen justify-center py-4 sm:py-6 md:py-8 text-light-blue">
			<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg sm:w-72 md:w-80 lg:w-96">
				<h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl text-center">
					Connexion
				</h2>

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

					<div className="w-full flex justify-between md:justify-end">
						<button
							className="block md:hidden text-blue-500 text-sm mt-2"
							onClick={() => setShowLoginForm(false)}>
							Pas encore inscrit ?
						</button>
						<button
							className="button bg-light-blue hover:bg-light-blue-3 mt-2 sm:mt-3 md:mt-5 text-sm sm:text-base md:text-lg text-dark-blue"
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
