import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import CheckAuthentication from '../components/utils/CheckAuthentication';

const Workspaces = () => {
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
	}, [redirectAfterLogin]);

	return (
		<div className="flex">
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<div className="w-full p-2.5">
				<Header />
				<main></main>
			</div>
		</div>
	);
};

export default Workspaces;
