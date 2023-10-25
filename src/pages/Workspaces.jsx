import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import { useUpdateTasksInStore } from '../components/utils/UpdateTasksInStore';
import getUserId from '../api/getUserId';

const Workspaces = () => {
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);
	useUpdateTasksInStore();

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
	}, [redirectAfterLogin]);

	return (
		<div className="flex">
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<div className="w-full p-2.5 bg-light-blue">
				<Header />
				<main></main>
			</div>
		</div>
	);
};

export default Workspaces;
