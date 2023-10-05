import React, { useEffect, useState } from 'react';
import LoginForm from '../components/home/LoginForm';
import Welcome from '../components/home/Welcome';
import CheckAuthentication from '../components/utils/CheckAuthentication';

const Home = () => {
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
	}, [redirectAfterLogin]);

	return (
		<div id="home" className="flex items-center justify-center">
			<main className="min-w-full min-h-screen grid grid-cols-[45%_55%]">
				<LoginForm />
				<Welcome />
				{!redirectAfterLogin ? <CheckAuthentication /> : null}
			</main>
		</div>
	);
};

export default Home;
