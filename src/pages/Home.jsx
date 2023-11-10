import React, { useEffect, useState } from 'react';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import SignupForm from '../components/home/SignupForm';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../components/home/LoginForm';

const Home = () => {
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
	}, [redirectAfterLogin]);

	return (
		<div className="flex items-center justify-center">
			<ToastContainer autoClose={3000} position="bottom-left" />
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<main className="grid grid-cols-[50%_50%] min-h-screen min-w-full bg-dark-blue">
				<SignupForm />
				<div>
					<LoginForm />
				</div>
			</main>
		</div>
	);
};

export default Home;
