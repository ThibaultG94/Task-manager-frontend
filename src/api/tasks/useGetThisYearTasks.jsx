import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setThisYearTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetThisYearTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getThisYearTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/${userId}/this-year`,
				{
					withCredentials: true,
				}
			);
			dispatch(setThisYearTasks(res.data.thisYearTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getThisYearTasks;
};
