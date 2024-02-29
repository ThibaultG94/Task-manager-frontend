import React, { useEffect, useState } from 'react';
import SignupForm from '../components/home/SignupForm';
import LoginForm from '../components/home/LoginForm';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
	const checkAuthentication = useCheckAuthentication();
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		checkAuthentication();
	}, [redirectAfterLogin]);

	return (
		<div className="flex items-center justify-center w-screen">
			<ToastContainer autoClose={3000} position="bottom-left" />
			<main className="grid grid-cols-1 md:grid-cols-2 min-h-screen min-w-full">
				<div
					className={`${
						showLoginForm ? 'hidden' : 'block'
					} md:block`}>
					<SignupForm setShowLoginForm={setShowLoginForm} />
				</div>
				<div
					className={`${
						showLoginForm ? 'block' : 'hidden'
					} md:block`}>
					<LoginForm setShowLoginForm={setShowLoginForm} />
				</div>
			</main>
		</div>
	);
};

export default HomePage;
