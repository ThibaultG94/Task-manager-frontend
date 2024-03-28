import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setTasksFailed,
	setTasksSuccess,
	setTasksAction,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetUserTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getUserTasks = async (userId) => {
		dispatch(setTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/all-tasks`,
				{
					withCredentials: true,
				}
			);
			dispatch(setTasksSuccess(res.data.userTasks));
			return res.data.userTasks;
		} catch (error) {
			dispatch(setTasksFailed(error));
			errorApi(error);
		}
	};

	return getUserTasks;
};
