import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNextWeekTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNextWeekTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextWeekTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-week`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextWeekTasks(res.data.nextWeekTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getNextWeekTasks;
};
