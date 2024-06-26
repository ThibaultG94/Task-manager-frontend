import React, { useEffect, useState } from 'react';
import { useGetUserId } from '../api/users/useGetUserId';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import { useUpdateTasksInStore } from '../utils/useUpdateTasksInStore';
import SideBar from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';

const WorkspacesPage = () => {
	const checkAuthentication = useCheckAuthentication();
	const getUserId = useGetUserId();
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
		checkAuthentication();
	}, [redirectAfterLogin]);

	return (
		<div className="bg-light-blue flex relative">
			<section className="bg-dark-blue fixed text-center text-white z-10">
				<SideBar />
			</section>
			<div className="flex flex-col md:ml-24 mt-16 md:mt-0 px-4 w-full">
				<Header />
				<main className="mt-1"></main>
			</div>
		</div>
	);
};

export default WorkspacesPage;
