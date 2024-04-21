import { useDispatch } from 'react-redux';
import {
	setArchivedTasksHasBeenUpdated,
	setBecomingTasksHasBeenUpdated,
	setHasBeenUpdated,
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
import { formatDateForDisplay } from './formatDateForDisplay';
import { getCategoryDay } from './getCategoryDay';
import { useGetNotifications } from '../api/notifications/useGetNotifications';

export const useTasksHasBeenUpdated = () => {
	const dispatch = useDispatch();

	const getNotifications = useGetNotifications();

	const updateCategory = (category) => {
		switch (category) {
			case 'retard-tasks':
				dispatch(setOverdueTasksHasBeenUpdated(true));
				break;
			case 'today-tasks':
				dispatch(setTodayTasksHasBeenUpdated(true));
				break;
			case 'tomorrow-tasks':
				dispatch(setTomorrowTasksHasBeenUpdated(true));
				break;
			case 'this-week-tasks':
				dispatch(setThisWeekTasksHasBeenUpdated(true));
				break;
			case 'this-weekend-tasks':
				dispatch(setThisWeekendTasksHasBeenUpdated(true));
				break;
			case 'next-week-tasks':
				dispatch(setNextWeekTasksHasBeenUpdated(true));
				break;
			case 'next-weekend-tasks':
				dispatch(setNextWeekendTasksHasBeenUpdated(true));
				break;
			case 'this-month-tasks':
				dispatch(setThisMonthTasksHasBeenUpdated(true));
				break;
			case 'next-month-tasks':
				dispatch(setNextMonthTasksHasBeenUpdated(true));
				break;
			case 'this-year-tasks':
				dispatch(setThisYearTasksHasBeenUpdated(true));
				break;
			case 'next-year-tasks':
				dispatch(setNextYearTasksHasBeenUpdated(true));
				break;
			case 'becoming-tasks':
				dispatch(setBecomingTasksHasBeenUpdated(true));
				break;
			case 'archived-tasks':
				dispatch(setArchivedTasksHasBeenUpdated(true));
				break;
			default:
				break;
		}
	};

	const tasksHasBeenUpdated = async (task, oldCategory) => {
		const day = await formatDateForDisplay(task.deadline);
		const category = await getCategoryDay(day, task.status, task.deadline);
		await getNotifications();

		if (oldCategory !== category) {
			updateCategory(oldCategory);
			updateCategory(category);
		} else {
			updateCategory(category);
		}

		dispatch(setHasBeenUpdated(true));
	};

	return tasksHasBeenUpdated;
};
