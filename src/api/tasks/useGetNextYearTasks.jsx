import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setNextYearTasksAction,
	setNextYearTasksFailed,
	setNextYearTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNextYearTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextYearTasks = async (userId) => {
		dispatch(setNextYearTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-year`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextYearTasksSuccess(res.data.nextYearTasks));
			return res.data.nextYearTasks;
		} catch (error) {
			dispatch(setNextYearTasksFailed(error));
			errorApi(error);
		}
	};

	return getNextYearTasks;
};
