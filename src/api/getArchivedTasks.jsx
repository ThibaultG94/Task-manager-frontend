import { useDispatch } from 'react-redux';
import {
	setArchivedTasks,
	setArchivedTasksFailed,
	setArchivedTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useGetArchivedTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getArchivedTasks = async (userId) => {
		dispatch(setArchivedTasks());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/archived`, {
				withCredentials: true,
			});
			dispatch(setArchivedTasksSuccess(res.data.archivedTasks));
			console.log(res.data.archivedTasks);
			return res.data.archivedTasks;
		} catch (error) {
			dispatch(setArchivedTasksFailed(error));
			errorApi(error);
		}
	};

	return getArchivedTasks;
};