import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNextMonthTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNextMonthTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextMonthTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-month`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextMonthTasks(res.data.nextMonthTasks));
			return res.data.nextMonthTasks;
		} catch (error) {
			errorApi(error);
		}
	};

	return getNextMonthTasks;
};
