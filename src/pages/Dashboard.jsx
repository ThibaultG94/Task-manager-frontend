import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import Calendar from '../components/dashboard/Calendar';
import UrgentTasks from '../components/dashboard/UrgentTasks';
import ListWorkspaces from '../components/dashboard/ListWorkspaces';
import Coworkers from '../components/dashboard/Coworkers';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import getUserId from '../api/getUserId';
import { useGetUser } from '../api/getUser';
import { useGetUrgentTasks } from '../api/getUrgentTasks';
import { useGetWorkspaces } from '../api/getWorkspaces';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectHasBeenUpdated,
	selectWorkspacesHasBeenUpdated,
} from '../store/selectors/editStateSelectors';
import {
	setHasBeenUpdated,
	setWorkspacesHasBeenUpdated,
} from '../store/feature/editState.slice';
import { useUpdateTasksInStore } from '../components/utils/UpdateTasksInStore';
import { ToastContainer } from 'react-toastify';

const Dashboard = () => {
	const dispatch = useDispatch();
	const hasBeenUpdated = useSelector(selectHasBeenUpdated);
	const workspacesHasBeenUpdated = useSelector(
		selectWorkspacesHasBeenUpdated
	);
	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);
	useUpdateTasksInStore();

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	const getUser = useGetUser();
	const getUrgentTasks = useGetUrgentTasks();
	const getWorkspaces = useGetWorkspaces();

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
	}, [redirectAfterLogin]);

	useEffect(() => {
		if (userId !== null) {
			getUser(userId);
			getUrgentTasks(userId);
			getWorkspaces(userId);
		}
	}, [userId]);

	useEffect(() => {
		if (hasBeenUpdated) {
			userId !== null && getUrgentTasks(userId);
			userId !== null && getWorkspaces(userId);
			dispatch(setHasBeenUpdated(false));
		}
		if (workspacesHasBeenUpdated) {
			userId !== null && getWorkspaces(userId);
			dispatch(setWorkspacesHasBeenUpdated(false));
		}
	}, [hasBeenUpdated, workspacesHasBeenUpdated]);

	return (
		<div className="bg-light-blue min-h-screen flex relative">
			<ToastContainer autoClose={600} position="bottom-left" />
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue fixed text-center text-white z-10">
				<SideBar userId={userId} />
			</section>
			<div className="flex flex-col xl:ml-24 mt-16 xl:mt-0 px-0 sm:px-1 md:px-2 lg:px-3 xl:px-4 w-full">
				<Header />
				<main className="dashboard-container mt-1">
					<Calendar />
					<UrgentTasks />
					<ListWorkspaces />
					<Coworkers />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
