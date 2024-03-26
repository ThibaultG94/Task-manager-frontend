import { useDispatch, useSelector } from 'react-redux';
import {
	selectArchivedTasksHasBeenUpdated,
	selectBecomingTasksHasBeenUpdated,
	selectNextMonthTasksHasBeenUpdated,
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
import { useGetOverdueTasks } from '../api/tasks/getOverdueTasks';
import { useGetTodayTasks } from '../api/tasks/getTodayTasks';
import { useGetTomorrowTasks } from '../api/tasks/getTomorrowTasks';
import { useGetThisWeekTasks } from '../api/tasks/getThisWeekTasks';
import { useGetThisWeekendTasks } from '../api/tasks/getThisWeekendTasks';
import { useGetNextWeekTasks } from '../api/tasks/getNextWeekTasks';
import { useGetNextWeekendTasks } from '../api/tasks/getNextWeekendTasks';
import { useGetThisMonthTasks } from '../api/tasks/getThisMonthTasks';
import { useGetNextMonthTasks } from '../api/tasks/getNextMonthTasks';
import { useGetThisYearTasks } from '../api/tasks/getThisYearTasks';
import { useGetNextYearTasks } from '../api/tasks/getNextYearTasks';
import { useGetBecomingTasks } from '../api/tasks/getBecomingTasks';
import { useGetArchivedTasks } from '../api/tasks/getArchivedTasks';
import { useEffect, useState } from 'react';
import {
	setArchivedTasksHasBeenUpdated,
	setBecomingTasksHasBeenUpdated,
	setNextMonthTasksHasBeenUpdated,
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
import getUserId from '../api/users/getUserId';
import { selectCurrentArchivedPage } from '../store/selectors/pagesSelectors';

export const useUpdateTasksInStore = () => {
	const dispatch = useDispatch();
	const [userId, setUserId] = useState(null);
	const currentArchivedTasks = useSelector(selectCurrentArchivedPage);
	const [currentPage, setCurrentPage] = useState(0);

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
	const nextMonthTasksHasBeenUpdated = useSelector(
		selectNextMonthTasksHasBeenUpdated
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
	const getArchivedTasks = useGetArchivedTasks();

	const getId = async () => {
		const id = await getUserId();
		setUserId(id);
	};

	useEffect(() => {
		getId();
	}, []);

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
		if (nextMonthTasksHasBeenUpdated) {
			userId !== null && getNextMonthTasks(userId);
			dispatch(setNextMonthTasksHasBeenUpdated(false));
		}
	}, [nextMonthTasksHasBeenUpdated]);

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
			setCurrentPage(0);
			setCurrentPage(currentArchivedTasks);
			dispatch(setArchivedTasksHasBeenUpdated(false));
		}
	}, [archivedTasksHasBeenUpdated]);

	useEffect(() => {
		if (currentPage && currentPage !== 0) {
			userId !== null && getArchivedTasks(userId, currentPage, 10);
		}
	}, [currentPage, archivedTasksHasBeenUpdated]);
};
