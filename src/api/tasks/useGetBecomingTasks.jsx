import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setBecomingTasksAction,
	setBecomingTasksFailed,
	setBecomingTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetBecomingTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getBecomingTasks = async (userId) => {
		dispatch(setBecomingTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tasks/${userId}/becoming`, {
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
