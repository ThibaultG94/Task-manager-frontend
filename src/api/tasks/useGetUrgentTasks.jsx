import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUrgentTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetUrgentTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getUrgentTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tasks/${userId}/urgent`, {
				withCredentials: true,
			});
			dispatch(setUrgentTasks(res.data.urgentTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getUrgentTasks;
};
