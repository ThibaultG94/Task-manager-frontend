import React, { useEffect, useState } from 'react';
import SignupForm from '../components/HomePage/SignupForm';
import LoginForm from '../components/HomePage/LoginForm';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import { ToastContainer } from 'react-toastify';

const HomePage = () => {
	const checkAuthentication = useCheckAuthentication();
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);

	const handleVisitorLogin = () => {
		console.log('Visitor mode');
	};

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		checkAuthentication();
	}, [redirectAfterLogin]);

	return (
		<div className="relative flex items-center justify-center w-screen h-screen">
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
			<div className="absolute">
                <button onClick={handleVisitorLogin} className="visitor-button">
                  	<span>
				 		Tester en un clic
						<br />
						{/* <i className="fas fa-play play-icon"></i> */}
					</span>  
                </button>
            </div>
		</div>
	);
};

export default HomePage;
