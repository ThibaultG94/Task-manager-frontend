import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
	setArchivedHasBeenUpdated,
	setHasBeenUpdated,
	setLongTermHasBeenUpdated,
	setMidTermHasBeenUpdated,
	setShortTermHasBeenUpdated,
} from '../../store/feature/editState.slice';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { getCategoryDay } from '../utils/getCategoryDay';

export const useTasksHasBeenUpdated = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const updateCategory = (category) => {
		switch (category) {
			case 'retard-tasks':
				dispatch(setShortTermHasBeenUpdated(true));
				break;
			case 'today-tasks':
				dispatch(setShortTermHasBeenUpdated(true));
				break;
			case 'tomorrow-tasks':
				dispatch(setShortTermHasBeenUpdated(true));
				break;
			case 'this-week-tasks':
				dispatch(setMidTermHasBeenUpdated(true));
				break;
			case 'this-weekend-tasks':
				dispatch(setMidTermHasBeenUpdated(true));
				break;
			case 'next-week-tasks':
				dispatch(setMidTermHasBeenUpdated(true));
				break;
			case 'next-weekend-tasks':
				dispatch(setMidTermHasBeenUpdated(true));
				break;
			case 'this-month-tasks':
				dispatch(setLongTermHasBeenUpdated(true));
				break;
			case 'next-month-tasks':
				dispatch(setLongTermHasBeenUpdated(true));
				break;
			case 'this-year-tasks':
				dispatch(setLongTermHasBeenUpdated(true));
				break;
			case 'next-year-tasks':
				dispatch(setLongTermHasBeenUpdated(true));
				break;
			case 'becoming-tasks':
				dispatch(setLongTermHasBeenUpdated(true));
				break;
			case 'archived-tasks':
				dispatch(setArchivedHasBeenUpdated(true));
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
