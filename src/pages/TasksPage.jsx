import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	selectIsBecomingTasksLoaded,
	selectIsNextMonthTasksLoaded,
	selectIsNextWeekTasksLoaded,
	selectIsNextYearTasksLoaded,
	selectIsOverdueTasksLoaded,
	selectIsThisMonthTasksLoaded,
	selectIsThisWeekTasksLoaded,
	selectIsThisYearTasksLoaded,
	selectIsTodayTasksLoaded,
	selectIsTomorrowTasksLoaded,
} from '../store/selectors/taskSelectors';
import { selectCurrentUser } from '../store/selectors/userSelectors';
import { selectConversationWindows } from '../store/selectors/conversationWindowsSelectors';
import { useCheckAuthentication } from '../utils/useCheckAuthentication';
import { useUpdateTasksInStore } from '../utils/useUpdateTasksInStore';
import getUserId from '../api/users/getUserId';
import { useGetUser } from '../api/users/useGetUser';
import { useGetWorkspaces } from '../api/workspaces/useGetWorkspaces';
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
import { useGetNotifications } from '../api/notifications/useGetNotifications';
import { useGetTips } from '../api/tips/useGetTips';
import { ToastContainer } from 'react-toastify';
import SideBar from '../components/SideBar/SideBar';
import Header from '../components/Header/Header';
import DisplayTasks from '../components/TasksPage/DisplayTasks';
import TaskPageTip from '../components/TasksPage/TaskPageTip';
import Conversation from '../components/Header/Messages/Conversation';

const TasksPage = () => {
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

	const currentUser = useSelector(selectCurrentUser);
	const conversationWindows = useSelector(selectConversationWindows);

	const checkAuthentication = useCheckAuthentication();

	useUpdateTasksInStore();

	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	const getUser = useGetUser();
	const getWorkspaces = useGetWorkspaces();
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
	const getNotifications = useGetNotifications();
	const getTips = useGetTips();

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
		checkAuthentication();
	}, [redirectAfterLogin]);

	useEffect(() => {
		const getData = async () => {
			if (userId !== null) {
				await getUser(userId);
				await getWorkspaces(userId);
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

			await getNotifications(userId);
			await getTips();
		};

		getData();
	}, [userId]);

	useEffect(() => {
		const userGetTips = async () => {
			if (currentUser && currentUser.tips) {
				await getTips();
			}
		};
		userGetTips();
	}, [currentUser]);

	return (
		<div className="bg-light-blue flex relative">
			<ToastContainer autoClose={600} position="bottom-right" />
			<section className="bg-dark-blue fixed text-center text-white z-20">
				<SideBar userId={userId} />
			</section>
			<div className="flex flex-col xl:ml-24 mt-16 xl:mt-0 px-0 sm:px-1 md:px-2 lg:px-3 xl:px-4 w-full">
				<Header />
				<main className="mt-1">
					<DisplayTasks />
					<TaskPageTip />
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

export default TasksPage;
