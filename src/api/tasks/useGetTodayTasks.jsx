import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTodayTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetTodayTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getTodayTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tasks/${userId}/today`, {
				withCredentials: true,
			});
			dispatch(setTodayTasks(res.data.todayTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getTodayTasks;
};
