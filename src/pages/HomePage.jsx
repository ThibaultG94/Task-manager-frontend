import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateVisitorSession } from '../api/users/useCreateVisitorSession';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import SignupForm from '../components/HomePage/SignupForm';
import LoginForm from '../components/HomePage/LoginForm';
import { ToastContainer } from 'react-toastify';
import LoadingComponent from '../components/Buttons/LoadingComponent';

const HomePage = () => {
	const navigate = useNavigate();

	const checkAuthentication = useCheckAuthentication();
	const createVisitorSession = useCreateVisitorSession();

	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleVisitorLogin = async () => {
		setIsLoading(true);
		const res = await createVisitorSession();
		if (res.status === 200) {
			navigate('/pages/dashboard');
			setIsLoading(false);
		} else {
			setIsLoading(false);
		}
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
			<div className="relative md:absolute">
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
		</div>
	);
};

export default HomePage;
