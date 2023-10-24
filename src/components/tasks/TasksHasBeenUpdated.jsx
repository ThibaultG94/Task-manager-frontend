import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
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
} from '../../store/feature/editState.slice';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { getCategoryDay } from '../utils/getCategoryDay';

export const useTasksHasBeenUpdated = () => {
	const dispatch = useDispatch();
	const location = useLocation();

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

		if (location.pathname === '/pages/tasks') {
			if (oldCategory !== category) {
				updateCategory(oldCategory);
				updateCategory(category);
			} else {
				updateCategory(category);
			}
		} else {
			dispatch(setHasBeenUpdated(true));
		}
	};

	return tasksHasBeenUpdated;
};
