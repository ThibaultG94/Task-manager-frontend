import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import {
	setArchivedTasksSuccess,
	setTodayTasksAction,
	setTodayTasksFailed,
	setTodayTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetTodayTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getTodayTasks = async (userId) => {
		dispatch(setTodayTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/today`, {
				withCredentials: true,
			});
			dispatch(setTodayTasksSuccess(res.data.todayTasks));
			return res.data.todayTasks;
		} catch (error) {
			dispatch(setTodayTasksFailed(error));
			errorApi(error);
		}
	};

	return getTodayTasks;
};
