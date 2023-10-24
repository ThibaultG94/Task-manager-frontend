import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import DisplayTasks from '../components/tasks/DisplayTasks';
import CheckAuthentication from '../components/utils/CheckAuthentication';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectArchivedTasksHasBeenUpdated,
	selectBecomingTasksHasBeenUpdated,
	selectNextWeekTasksHasBeenUpdated,
	selectNextWeekendTasksHasBeenUpdated,
	selectNextYearTasksHasBeenUpdated,
	selectOverdueTasksHasBeenUpdated,
	selectThisMonthTasksHasBeenUpdated,
	selectThisWeekTasksHasBeenUpdated,
	selectThisWeekendTasksHasBeenUpdated,
	selectThisYearTasksHasBeenUpdated,
	selectTodayTasksHasBeenUpdated,
	selectTomorrowTasksHasBeenUpdated,
} from '../store/selectors/editStateSelectors';
import getUserId from '../api/getUserId';
import { useGetUser } from '../api/getUser';
import { useGetWorkspaces } from '../api/getWorkspaces';
import {
	setArchivedTasksHasBeenUpdated,
	setBecomingTasksHasBeenUpdated,
	setNextWeekTasksHasBeenUpdated,
	setNextWeekendTasksHasBeenUpdated,
	setNextYearTasksHasBeenUpdated,
	setOverdueTasksHasBeenUpdated,
	setThisMonthTasksHasBeenUpdated,
	setThisWeekTasksHasBeenUpdated,
	setThisWeekendTasksHasBeenUpdated,
	setThisYearTasksHasBeenUpdated,
	setTodayTasksHasBeenUpdated,
	setTomorrowTasksHasBeenUpdated,
} from '../store/feature/editState.slice';
import { useGetArchivedTasks } from '../api/getArchivedTasks';
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

const Tasks = () => {
	const dispatch = useDispatch();
	const overdueTasksHasBeenUpdated = useSelector(
		selectOverdueTasksHasBeenUpdated
	);
	const todayTasksHasBeenUpdated = useSelector(
		selectTodayTasksHasBeenUpdated
	);
	const tomorrowTasksHasBeenUpdated = useSelector(
		selectTomorrowTasksHasBeenUpdated
	);
	const thisWeekTasksHasBeenUpdated = useSelector(
		selectThisWeekTasksHasBeenUpdated
	);
	const thisWeekendTasksHasBeenUpdated = useSelector(
		selectThisWeekendTasksHasBeenUpdated
	);
	const nextWeekTasksHasBeenUpdated = useSelector(
		selectNextWeekTasksHasBeenUpdated
	);
	const nextWeekendTasksHasBeenUpdated = useSelector(
		selectNextWeekendTasksHasBeenUpdated
	);
	const thisMonthTasksHasBeenUpdated = useSelector(
		selectThisMonthTasksHasBeenUpdated
	);
	const thisYearTasksHasBeenUpdated = useSelector(
		selectThisYearTasksHasBeenUpdated
	);
	const nextYearTasksHasBeenUpdated = useSelector(
		selectNextYearTasksHasBeenUpdated
	);
	const becomingTasksHasBeenUpdated = useSelector(
		selectBecomingTasksHasBeenUpdated
	);
	const archivedTasksHasBeenUpdated = useSelector(
		selectArchivedTasksHasBeenUpdated
	);
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
	const getThisWeekendTasks = useGetThisWeekendTasks();
	const getNextWeekTasks = useGetNextWeekTasks();
	const getNextWeekendTasks = useGetNextWeekendTasks();
	const getThisMonthTasks = useGetThisMonthTasks();
	const getThisYearTasks = useGetThisYearTasks();
	const getNextYearTasks = useGetNextYearTasks();
	const getBecomingTasks = useGetBecomingTasks();
	const getArchivedTasks = useGetArchivedTasks();

	useEffect(() => {
		setRedirectAfterLogin(sessionStorage.getItem('redirectAfterLogin'));
		getId();
	}, [redirectAfterLogin]);

	useEffect(() => {
		const getData = async () => {
			if (userId !== null) {
				await getUser(userId);
				await getWorkspaces(userId);
				await getOverdueTasks(userId);
				await getTodayTasks(userId);
				await getTomorrowTasks(userId);
				await getThisWeekTasks(userId);
				await getThisWeekendTasks(userId);
				await getNextWeekTasks(userId);
				await getNextWeekendTasks(userId);
				await getThisMonthTasks(userId);
				await getThisYearTasks(userId);
				await getNextYearTasks(userId);
				await getBecomingTasks(userId);
			}
		};

		getData();
	}, [userId]);

	useEffect(() => {
		if (overdueTasksHasBeenUpdated) {
			userId !== null && getOverdueTasks(userId);
			dispatch(setOverdueTasksHasBeenUpdated(false));
		}
	}, [overdueTasksHasBeenUpdated]);

	useEffect(() => {
		if (todayTasksHasBeenUpdated) {
			userId !== null && getTodayTasks(userId);
			dispatch(setTodayTasksHasBeenUpdated(false));
		}
	}, [todayTasksHasBeenUpdated]);

	useEffect(() => {
		if (tomorrowTasksHasBeenUpdated) {
			userId !== null && getTomorrowTasks(userId);
			dispatch(setTomorrowTasksHasBeenUpdated(false));
		}
	}, [tomorrowTasksHasBeenUpdated]);

	useEffect(() => {
		if (thisWeekTasksHasBeenUpdated) {
			userId !== null && getThisWeekTasks(userId);
			dispatch(setThisWeekTasksHasBeenUpdated(false));
		}
	}, [thisWeekTasksHasBeenUpdated]);

	useEffect(() => {
		if (thisWeekendTasksHasBeenUpdated) {
			userId !== null && getThisWeekendTasks(userId);
			dispatch(setThisWeekendTasksHasBeenUpdated(false));
		}
	}, [thisWeekendTasksHasBeenUpdated]);

	useEffect(() => {
		if (nextWeekTasksHasBeenUpdated) {
			userId !== null && getNextWeekTasks(userId);
			dispatch(setNextWeekTasksHasBeenUpdated(false));
		}
	}, [nextWeekTasksHasBeenUpdated]);

	useEffect(() => {
		if (nextWeekendTasksHasBeenUpdated) {
			userId !== null && getNextWeekendTasks(userId);
			dispatch(setNextWeekendTasksHasBeenUpdated(false));
		}
	}, [nextWeekendTasksHasBeenUpdated]);

	useEffect(() => {
		if (thisMonthTasksHasBeenUpdated) {
			userId !== null && getThisMonthTasks(userId);
			dispatch(setThisMonthTasksHasBeenUpdated(false));
		}
	}, [thisMonthTasksHasBeenUpdated]);

	useEffect(() => {
		if (thisYearTasksHasBeenUpdated) {
			userId !== null && getThisYearTasks(userId);
			dispatch(setThisYearTasksHasBeenUpdated(false));
		}
	}, [thisYearTasksHasBeenUpdated]);

	useEffect(() => {
		if (nextYearTasksHasBeenUpdated) {
			userId !== null && getNextYearTasks(userId);
			dispatch(setNextYearTasksHasBeenUpdated(false));
		}
	}, [nextYearTasksHasBeenUpdated]);

	useEffect(() => {
		if (becomingTasksHasBeenUpdated) {
			userId !== null && getBecomingTasks(userId);
			dispatch(setBecomingTasksHasBeenUpdated(false));
		}
	}, [becomingTasksHasBeenUpdated]);

	useEffect(() => {
		if (archivedTasksHasBeenUpdated) {
			userId !== null && getArchivedTasks(userId);
			dispatch(setArchivedTasksHasBeenUpdated(false));
		}
	}, [archivedTasksHasBeenUpdated]);

	return (
		<div className="flex">
			{!redirectAfterLogin ? <CheckAuthentication /> : null}
			<section className="bg-dark-blue text-white text-center">
				<SideBar userId={userId} />
			</section>
			<div className="w-full p-2.5 bg-light-blue">
				<Header />
				<main>
					<DisplayTasks />
				</main>
			</div>
		</div>
	);
};

export default Tasks;
