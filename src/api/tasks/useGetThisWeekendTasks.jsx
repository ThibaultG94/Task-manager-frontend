import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setThisWeekendTasksAction,
	setThisWeekendTasksFailed,
	setThisWeekendTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetThisWeekendTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getThisWeekendTasks = async (userId) => {
		dispatch(setThisWeekendTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/this-weekend`,
				{
					withCredentials: true,
				}
			);
			dispatch(setThisWeekendTasksSuccess(res.data.thisWeekendTasks));
			return res.data.thisWeekendTasks;
		} catch (error) {
			dispatch(setThisWeekendTasksFailed(error));
			errorApi(error);
		}
	};

	return getThisWeekendTasks;
};
