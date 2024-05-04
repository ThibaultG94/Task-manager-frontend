import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setThisWeekTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetThisWeekTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getThisWeekTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/this-week`,
				{
					withCredentials: true,
				}
			);
			dispatch(setThisWeekTasks(res.data.thisWeekTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getThisWeekTasks;
};
