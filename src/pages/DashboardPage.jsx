import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectHasBeenUpdated,
	selectWorkspacesHasBeenUpdated,
} from '../store/selectors/editStateSelectors';
import {
	setHasBeenUpdated,
	setWorkspacesHasBeenUpdated,
} from '../store/feature/editState.slice';
import getUserId from '../api/users/getUserId';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import { useUpdateTasksInStore } from '../utils/useUpdateTasksInStore';
import { useGetUser } from '../api/users/useGetUser';
import { useGetUrgentTasks } from '../api/tasks/useGetUrgentTasks';
import { useGetWorkspaces } from '../api/workspaces/useGetWorkspaces';
import { useGetContacts } from '../api/users/useGetContacts';
import { useGetNotifications } from '../api/notifications/useGetNotifications';
import { ToastContainer } from 'react-toastify';
import SideBar from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';
import Calendar from '../components/DashboardPage/Calendar';
import UrgentTasks from '../components/DashboardPage/UrgentTasks';
import ListWorkspaces from '../components/DashboardPage/ListWorkspaces';
import Contacts from '../components/DashboardPage/Contacts';

const DashboardPage = () => {
	const dispatch = useDispatch();
	const hasBeenUpdated = useSelector(selectHasBeenUpdated);
	const workspacesHasBeenUpdated = useSelector(
		selectWorkspacesHasBeenUpdated
	);

	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);
	
	useUpdateTasksInStore();
	const checkAuthentication = useCheckAuthentication();
	const getUser = useGetUser();
	const getUrgentTasks = useGetUrgentTasks();
	const getWorkspaces = useGetWorkspaces();
	const getContacts = useGetContacts();
	const getNotifications = useGetNotifications();

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};
	
	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
		checkAuthentication();
	}, [redirectAfterLogin]);

	useEffect(() => {
		if (userId !== null) {
			getUser(userId);
			getUrgentTasks(userId);
			getWorkspaces(userId);
			getContacts(userId);
			getNotifications(userId);
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
			userId !== null && getUrgentTasks(userId);
			dispatch(setWorkspacesHasBeenUpdated(false));
		}
	}, [hasBeenUpdated, workspacesHasBeenUpdated]);

	return (
		<div className="bg-light-blue min-h-screen flex relative">
			<ToastContainer autoClose={600} position="bottom-left" />
			<section className="bg-dark-blue fixed text-center text-white z-20">
				<SideBar userId={userId} />
			</section>
			<div className="flex flex-col xl:ml-24 mt-16 xl:mt-0 px-0 sm:px-1 md:px-2 lg:px-3 xl:px-4 w-full">
				<Header />
				<main className="dashboard-container mt-1">
					<Calendar />
					<UrgentTasks />
					<ListWorkspaces userId={userId} />
					<Contacts userId={userId} />
				</main>
			</div>
		</div>
	);
};

export default DashboardPage;
