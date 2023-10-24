import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import axios from 'axios';
import {
	setThisWeekTasksAction,
	setThisWeekTasksFailed,
	setThisWeekTasksSuccess,
} from '../store/feature/tasks.slice';

export const useGetThisWeekTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getThisWeekTasks = async (userId) => {
		dispatch(setThisWeekTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/this-week`, {
				withCredentials: true,
			});
			dispatch(setThisWeekTasksSuccess(res.data.thisWeekTasks));
			return res.data.thisWeekTasks;
		} catch (error) {
			dispatch(setThisWeekTasksFailed(error));
			errorApi(error);
		}
	};

	return getThisWeekTasks;
};
