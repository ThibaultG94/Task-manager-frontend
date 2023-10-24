import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import axios from 'axios';
import {
	setBecomingTasksAction,
	setBecomingTasksFailed,
	setBecomingTasksSuccess,
} from '../store/feature/tasks.slice';

export const useGetBecomingTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getBecomingTasks = async (userId) => {
		dispatch(setBecomingTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/becoming`, {
				withCredentials: true,
			});
			dispatch(setBecomingTasksSuccess(res.data.becomingTasks));
			return res.data.becomingTasks;
		} catch (error) {
			dispatch(setBecomingTasksFailed(error));
			errorApi(error);
		}
	};

	return getBecomingTasks;
};
