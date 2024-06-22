// DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHasBeenUpdated } from '../store/selectors/editStateSelectors';
import { selectConversationWindows } from '../store/selectors/conversationWindowsSelectors';
import { setHasBeenUpdated } from '../store/feature/editState.slice';
import { selectIsBecomingTasksLoaded, selectIsNextMonthTasksLoaded, selectIsNextWeekTasksLoaded, selectIsNextYearTasksLoaded, selectIsOverdueTasksLoaded, selectIsThisMonthTasksLoaded, selectIsThisWeekTasksLoaded, selectIsThisYearTasksLoaded, selectIsTodayTasksLoaded, selectIsTomorrowTasksLoaded } from '../store/selectors/taskSelectors';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import { useUpdateTasksInStore } from '../utils/useUpdateTasksInStore';
import { useGetUserId } from '../api/users/useGetUserId';
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
import Conversation from '../components/Header/Messages/Conversation';
import { useGetOverdueTasks } from '../api/tasks/useGetOverdueTasks';
import { useGetTodayTasks } from '../api/tasks/useGetTodayTasks';
import { useGetTomorrowTasks } from '../api/tasks/useGetTomorrowTasks';
import { useGetThisWeekTasks } from '../api/tasks/useGetThisWeekTasks';
import { useGetNextWeekTasks } from '../api/tasks/useGetNextWeekTasks';
import { useGetThisMonthTasks } from '../api/tasks/useGetThisMonthTasks';
import { useGetNextMonthTasks } from '../api/tasks/useGetNextMonthTasks';
import { useGetThisYearTasks } from '../api/tasks/useGetThisYearTasks';
import { useGetNextYearTasks } from '../api/tasks/useGetNextYearTasks';
import { useGetBecomingTasks } from '../api/tasks/useGetBecomingTasks';
import { useGetBlockedContacts } from '../api/users/useGetBlockedContacts';

const DashboardPage = () => {
	const dispatch = useDispatch();
	const hasBeenUpdated = useSelector(selectHasBeenUpdated);
	const conversationWindows = useSelector(selectConversationWindows);
	const isOverdueTasksLoaded = useSelector(selectIsOverdueTasksLoaded);
	const isTodayTasksLoaded = useSelector(selectIsTodayTasksLoaded);
	const isTomorrowTasksLoaded = useSelector(selectIsTomorrowTasksLoaded);
	const isThisWeekTasksLoaded = useSelector(selectIsThisWeekTasksLoaded);
	const isNextWeekTasksLoaded = useSelector(selectIsNextWeekTasksLoaded);
	const isThisMonthTasksLoaded = useSelector(selectIsThisMonthTasksLoaded);
	const isNextMonthTasksLoaded = useSelector(selectIsNextMonthTasksLoaded);
	const isThisYearTasksLoaded = useSelector(selectIsThisYearTasksLoaded);
	const isNextYearTasksLoaded = useSelector(selectIsNextYearTasksLoaded);
	const isBecomingTasksLoaded = useSelector(selectIsBecomingTasksLoaded);

	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);
	
	useUpdateTasksInStore();
	const checkAuthentication = useCheckAuthentication();
	const getUserId = useGetUserId();
	const getUser = useGetUser();
	const getUrgentTasks = useGetUrgentTasks();
	const getWorkspaces = useGetWorkspaces();
	const getContacts = useGetContacts();
	const getBlockedContacts = useGetBlockedContacts();
	const getNotifications = useGetNotifications();
	const getOverdueTasks = useGetOverdueTasks();
	const getTodayTasks = useGetTodayTasks();
	const getTomorrowTasks = useGetTomorrowTasks();
	const getThisWeekTasks = useGetThisWeekTasks();
	const getNextWeekTasks = useGetNextWeekTasks();
	const getThisMonthTasks = useGetThisMonthTasks();
	const getNextMonthTasks = useGetNextMonthTasks();
	const getThisYearTasks = useGetThisYearTasks();
	const getNextYearTasks = useGetNextYearTasks();
	const getBecomingTasks = useGetBecomingTasks();

	const getId = async () => {
		await getUserId().then((id) => setUserId(id));
	};
	
	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
		checkAuthentication();
	}, [redirectAfterLogin]);

	useEffect(() => {
		const getData = async () => {
			if (userId) {
				console.log('userId', userId);
				await getUser(userId);
				await getUrgentTasks(userId);
				await getWorkspaces(userId);
				await getContacts(userId);
				await getNotifications(userId);
				await getBlockedContacts(userId);
				if (!isOverdueTasksLoaded) await getOverdueTasks(userId);
				if (!isTodayTasksLoaded) await getTodayTasks(userId);
				if (!isTomorrowTasksLoaded) await getTomorrowTasks(userId);
				if (!isThisWeekTasksLoaded) await getThisWeekTasks(userId);
				if (!isNextWeekTasksLoaded) await getNextWeekTasks(userId);
				if (!isThisMonthTasksLoaded) await getThisMonthTasks(userId);
				if (!isNextMonthTasksLoaded) await getNextMonthTasks(userId);
				if (!isThisYearTasksLoaded) await getThisYearTasks(userId);
				if (!isNextYearTasksLoaded) await getNextYearTasks(userId);
				if (!isBecomingTasksLoaded) await getBecomingTasks(userId);
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		if (hasBeenUpdated) {
			userId !== null && getUrgentTasks(userId);
			dispatch(setHasBeenUpdated(false));
		}
	}, [hasBeenUpdated]);

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

			{conversationWindows && conversationWindows.map((window, index) => (
				<Conversation
					key={window.contact.id}
					contact={window.contact}
					index={index}
					isMinimized={window.isMinimized}
				/>
			))}
		</div>
	);
};

export default DashboardPage;
