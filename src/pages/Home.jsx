import React, { useEffect, useState } from 'react';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import SignupForm from '../components/home/SignupForm';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../components/home/LoginForm';

const Home = () => {
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
	}, [redirectAfterLogin]);

	return (
		<div className="flex items-center justify-center w-screen">
			<ToastContainer autoClose={3000} position="bottom-left" />
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
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

export default Home;
