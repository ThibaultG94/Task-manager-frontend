import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import axios from 'axios';
import {
	setNextWeekendTasksAction,
	setNextWeekendTasksFailed,
	setNextWeekendTasksSuccess,
} from '../../store/feature/tasks.slice';

export const useGetNextWeekendTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextWeekendTasks = async (userId) => {
		dispatch(setNextWeekendTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-weekend`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextWeekendTasksSuccess(res.data.nextWeekendTasks));
			return res.data.nextWeekendTasks;
		} catch (error) {
			dispatch(setNextWeekendTasksFailed(error));
			errorApi(error);
		}
	};

	return getNextWeekendTasks;
};
