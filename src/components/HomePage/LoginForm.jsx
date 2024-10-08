import React, { useEffect, useState } from 'react';
import EmailLogin from './LoginForm/EmailLogin';
import PasswordLogin from './LoginForm/PasswordLogin';
import { useHandleLoginInputChange } from '../../utils/useHandleInputChange';
import { useSubmitForLoginAccount } from '../../utils/useSubmitAccount';
import useErrorLogin from '../../utils/useErrorLogin';
import PasswordResetModal from './PasswordResetModal';
import { useForgotPassword } from '../../api/users/useForgotPassword';
import LoadingComponent from '../Buttons/LoadingComponent';

const LoginForm = ({ setShowLoginForm, isLoading, handleVisitorLogin }) => {
	const [errorWithLogin, setErrorWithLogin] = useState(null);
	const [isModalResetPasswordOpen, setIsModalResetPasswordOpen] =
		useState(false);
	const [inputsFormValues, setInputsFormValues] = useState({
		email: '',
		password: '',
	});
	const [inputsFormErrors, setInputsFormErrors] = useState({
		email: null,
		password: null,
	});

	const { errorLogin, isDelayActive, errorCount  } = useErrorLogin({ setInputsFormErrors });
	const handleLoginInputChange = useHandleLoginInputChange({
		setInputsFormValues,
	});
	const submitForLoginAccount = useSubmitForLoginAccount({
		inputsFormValues,
		setErrorWithLogin,
	});
	const forgotPassword = useForgotPassword();

	const openModalResetPassword = () => setIsModalResetPasswordOpen(true);
	const closeModalResetPassword = () => setIsModalResetPasswordOpen(false);

	const resetPassword = async (email) => {
		await forgotPassword(email);
		closeModalResetPassword();
	};

	useEffect(() => {
		if (errorWithLogin) errorLogin(errorWithLogin);
	}, [errorWithLogin]);

	return (
		<section className="bg-dark-blue flex h-screen justify-center py-4 sm:py-6 md:py-8 text-light-blue">
			<div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg sm:w-72 md:w-80 lg:w-96">
				<h2 className="mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl text-center">
					Connexion
				</h2>

				<form
					className="flex flex-col items-start"
					onSubmit={submitForLoginAccount}>
					<EmailLogin
						inputsFormErrors={inputsFormErrors}
						inputsFormValues={inputsFormValues}
						handleLoginInputChange={handleLoginInputChange}
						errorCount={errorCount}
					/>

					<PasswordLogin
						inputsFormErrors={inputsFormErrors}
						inputsFormValues={inputsFormValues}
						handleLoginInputChange={handleLoginInputChange}
						openModalResetPassword={openModalResetPassword}
						errorCount={errorCount}
					/>

					<div className="w-full flex justify-between md:justify-end">
						<button
							className="block md:hidden text-blue-500 text-sm mt-2"
							onClick={() => setShowLoginForm(false)}>
							Pas encore inscrit ?
						</button>
						<button
							className={`button bg-light-blue hover:bg-light-blue-300 mt-2 sm:mt-3 md:mt-5 text-sm sm:text-base md:text-lg text-dark-blue ${isDelayActive ? 'loading-animation' : ''}`}
							type="submit"
							disabled={isDelayActive}>
								Se connecter
						</button>
					</div>
					<div className="flex justify-center w-full md:hidden mt-20">
						<button onClick={handleVisitorLogin} className="visitor-button">
							{isLoading ? (
								<LoadingComponent />
							) : (
								<span>
									Tester en un clic
								<br />
								{/* <i className="fas fa-play play-icon"></i> */}
								</span>  
							)}
						</button>
					</div>
				</form>
			</div>

			<PasswordResetModal
				isOpen={isModalResetPasswordOpen}
				onClose={closeModalResetPassword}
				onReset={resetPassword}
			/>
		</section>
	);
};

export default LoginForm;
