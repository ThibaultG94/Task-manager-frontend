import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	setTomorrowTasksAction,
	setTomorrowTasksFailed,
	setTomorrowTasksSuccess,
} from '../../store/feature/tasks.slice';
import axios from 'axios';

export const useGetTomorrowTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getTomorrowTasks = async (userId) => {
		dispatch(setTomorrowTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tasks/${userId}/tomorrow`, {
				withCredentials: true,
			});
			dispatch(setTomorrowTasksSuccess(res.data.tomorrowTasks));
			return res.data.tomorrowTasks;
		} catch (error) {
			dispatch(setTomorrowTasksFailed(error));
			errorApi(error);
		}
	};

	return getTomorrowTasks;
};
