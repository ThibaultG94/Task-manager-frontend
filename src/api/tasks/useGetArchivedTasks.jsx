import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setArchivedTasks,
	setTotalArchivedTasks,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetArchivedTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getArchivedTasks = async (userId, page, limit) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/archived?page=${page}&limit=${limit}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setArchivedTasks(res.data.archivedTasks));
			dispatch(setTotalArchivedTasks(res.data.totalTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getArchivedTasks;
};
