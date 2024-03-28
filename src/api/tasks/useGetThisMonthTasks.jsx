import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setThisMonthTasksAction,
	setThisMonthTasksFailed,
	setThisMonthTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetThisMonthTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getThisMonthTasks = async (userId) => {
		dispatch(setThisMonthTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/this-month`,
				{
					withCredentials: true,
				}
			);
			dispatch(setThisMonthTasksSuccess(res.data.thisMonthTasks));
			return res.data.thisMonthTasks;
		} catch (error) {
			dispatch(setThisMonthTasksFailed(error));
			errorApi(error);
		}
	};

	return getThisMonthTasks;
};
