import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNextYearTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNextYearTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNextYearTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/next-year`,
				{
					withCredentials: true,
				}
			);
			dispatch(setNextYearTasks(res.data.nextYearTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getNextYearTasks;
};
