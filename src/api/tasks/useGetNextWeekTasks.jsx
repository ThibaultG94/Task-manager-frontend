import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setNextWeekTasksAction,
	setNextWeekTasksFailed,
	setNextWeekTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNextWeekTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextWeekTasks = async (userId) => {
		dispatch(setNextWeekTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-week`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextWeekTasksSuccess(res.data.nextWeekTasks));
			return res.data.nextWeekTasks;
		} catch (error) {
			dispatch(setNextWeekTasksFailed(error));
			errorApi(error);
		}
	};

	return getNextWeekTasks;
};
