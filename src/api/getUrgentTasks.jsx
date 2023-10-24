import { useDispatch } from 'react-redux';
import {
	setUrgentTasksAction,
	setUrgentTasksFailed,
	setUrgentTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useGetUrgentTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getUrgentTasks = async (userId) => {
		dispatch(setUrgentTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/urgent`, {
				withCredentials: true,
			});
			dispatch(setUrgentTasksSuccess(res.data.urgentTasks));
		} catch (error) {
			dispatch(setUrgentTasksFailed(error));
			errorApi(error);
		}
	};

	return getUrgentTasks;
};
