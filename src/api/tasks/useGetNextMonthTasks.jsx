import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setNextMonthTasksAction,
	setNextMonthTasksFailed,
	setNextMonthTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNextMonthTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextMonthTasks = async (userId) => {
		dispatch(setNextMonthTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-month`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextMonthTasksSuccess(res.data.nextMonthTasks));
			return res.data.nextMonthTasks;
		} catch (error) {
			dispatch(setNextMonthTasksFailed(error));
			errorApi(error);
		}
	};

	return getNextMonthTasks;
};