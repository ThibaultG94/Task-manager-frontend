import { useDispatch } from 'react-redux';
import {
	setTaskFailed,
	setTaskSuccess,
	setTasksAction,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useGetUserTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getUserTasks = async (userId) => {
		dispatch(setTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/all-tasks`, {
				withCredentials: true,
			});
			dispatch(setTaskSuccess(res.data.userTasks));
			return res.data.userTasks;
		} catch (error) {
			dispatch(setTaskFailed(error));
			errorApi(error);
		}
	};

	return getUserTasks;
};
