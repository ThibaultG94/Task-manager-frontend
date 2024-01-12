import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import axios from 'axios';
import {
	setThisWeekendTasksAction,
	setThisWeekendTasksFailed,
	setThisWeekendTasksSuccess,
} from '../../store/feature/tasks.slice';

export const useGetThisWeekendTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getThisWeekendTasks = async (userId) => {
		dispatch(setThisWeekendTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/task/${userId}/this-weekend`,
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
