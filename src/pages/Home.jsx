import React, { useEffect, useState } from 'react';
import LoginForm from '../components/home/LoginForm';
import Welcome from '../components/home/Welcome';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import '../style/pages/Home.scss';
import '../style/components/formchecker.scss';
import '../style/components/modal.scss';

const Home = () => {
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
	}, [redirectAfterLogin]);

	return (
		<div className="flex items-center justify-center">
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<main className="min-w-full min-h-screen grid grid-cols-[45%_55%]">
				<LoginForm />
				<Welcome />
			</main>
		</div>
	);
};

export default Home;
