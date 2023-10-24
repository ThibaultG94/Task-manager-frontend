import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import {
	setOverdueTasksAction,
	setOverdueTasksFailed,
	setOverdueTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetOverdueTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getOverdueTasks = async (userId) => {
		dispatch(setOverdueTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/overdue`, {
				withCredentials: true,
			});
			dispatch(setOverdueTasksSuccess(res.data.overdueTasks));
			return res.data.overdueTasks;
		} catch (error) {
			dispatch(setOverdueTasksFailed(error));
			errorApi(error);
		}
	};

	return getOverdueTasks;
};
