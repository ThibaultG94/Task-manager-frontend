import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import DisplayTasks from '../components/tasks/DisplayTasks';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import { useSelector } from 'react-redux';
import getUserId from '../api/getUserId';
import { useGetUser } from '../api/getUser';
import { useGetWorkspaces } from '../api/getWorkspaces';
import { useGetOverdueTasks } from '../api/getOverdueTasks';
import { useGetTodayTasks } from '../api/getTodayTasks';
import { useGetTomorrowTasks } from '../api/getTomorrowTasks';
import { useGetThisWeekTasks } from '../api/getThisWeekTasks';
import { useGetThisWeekendTasks } from '../api/getThisWeekendTasks';
import { useGetNextWeekendTasks } from '../api/getNextWeekendTasks';
import { useGetNextWeekTasks } from '../api/getNextWeekTasks';
import { useGetThisMonthTasks } from '../api/getThisMonthTasks';
import { useGetThisYearTasks } from '../api/getThisYearTasks';
import { useGetNextYearTasks } from '../api/getNextYearTasks';
import { useGetBecomingTasks } from '../api/getBecomingTasks';
import { useGetNextMonthTasks } from '../api/getNextMonthTasks';
import {
	selectIsBecomingTasksLoaded,
	selectIsNextMonthTasksLoaded,
	selectIsNextWeekTasksLoaded,
	selectIsNextYearTasksLoaded,
	selectIsOverdueTasksLoaded,
	selectIsThisMonthTasksLoaded,
	selectIsThisWeekTasksLoaded,
	selectIsThisWeekendTasksLoaded,
	selectIsThisYearTasksLoaded,
	selectIsTodayTasksLoaded,
	selectIsTomorrowTasksLoaded,
} from '../store/selectors/taskSelectors';
import { useUpdateTasksInStore } from '../components/utils/UpdateTasksInStore';
import { ToastContainer } from 'react-toastify';

const Tasks = () => {
	const isOverdueTasksLoaded = useSelector(selectIsOverdueTasksLoaded);
	const isTodayTasksLoaded = useSelector(selectIsTodayTasksLoaded);
	const isTomorrowTasksLoaded = useSelector(selectIsTomorrowTasksLoaded);
	const isThisWeekTasksLoaded = useSelector(selectIsThisWeekTasksLoaded);
	const isThisWeekendTasksLoaded = useSelector(
		selectIsThisWeekendTasksLoaded
	);

	const isNextWeekTasksLoaded = useSelector(selectIsNextWeekTasksLoaded);
	const isNextWeekendTasksLoaded = useSelector(selectIsNextWeekTasksLoaded);
	const isThisMonthTasksLoaded = useSelector(selectIsThisMonthTasksLoaded);
	const isNextMonthTasksLoaded = useSelector(selectIsNextMonthTasksLoaded);
	const isThisYearTasksLoaded = useSelector(selectIsThisYearTasksLoaded);
	const isNextYearTasksLoaded = useSelector(selectIsNextYearTasksLoaded);
	const isBecomingTasksLoaded = useSelector(selectIsBecomingTasksLoaded);

	const [redirectAfterLogin, setRedirectAfterLogin] = useState(false);
	const [userId, setUserId] = useState(null);
	useUpdateTasksInStore();

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
	const getThisWeekendTasks = useGetThisWeekendTasks();
	const getNextWeekTasks = useGetNextWeekTasks();
	const getNextWeekendTasks = useGetNextWeekendTasks();
	const getThisMonthTasks = useGetThisMonthTasks();
	const getNextMonthTasks = useGetNextMonthTasks();
	const getThisYearTasks = useGetThisYearTasks();
	const getNextYearTasks = useGetNextYearTasks();
	const getBecomingTasks = useGetBecomingTasks();

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
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
				if (!isThisWeekendTasksLoaded)
					await getThisWeekendTasks(userId);
				if (!isNextWeekTasksLoaded) await getNextWeekTasks(userId);
				if (!isNextWeekendTasksLoaded)
					await getNextWeekendTasks(userId);
				if (!isThisMonthTasksLoaded) await getThisMonthTasks(userId);
				if (!isNextMonthTasksLoaded) await getNextMonthTasks(userId);
				if (!isThisYearTasksLoaded) await getThisYearTasks(userId);
				if (!isNextYearTasksLoaded) await getNextYearTasks(userId);
				if (!isBecomingTasksLoaded) await getBecomingTasks(userId);
			}
		};

		getData();
	}, [userId]);

	return (
		<div className="bg-light-blue flex relative">
			<ToastContainer autoClose={600} position="bottom-right" />
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue fixed text-center text-white z-10">
				<SideBar userId={userId} />
			</section>
			<div className="flex flex-col xl:ml-24 mt-16 xl:mt-0 px-0 sm:px-1 md:px-2 lg:px-3 xl:px-4 w-full">
				<Header />
				<main className="mt-1">
					<DisplayTasks userId={userId} />
				</main>
			</div>
		</div>
	);
};

export default Tasks;
