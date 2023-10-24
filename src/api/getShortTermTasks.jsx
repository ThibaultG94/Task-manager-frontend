import { useDispatch } from 'react-redux';
import {
	setShortTermTasks,
	setShortTermTasksFailed,
	setShortTermTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useGetShortTermTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getShortTermTasks = async (userId) => {
		dispatch(setShortTermTasks());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/task/${userId}/short-term`,
				{
					withCredentials: true,
				}
			);
			dispatch(setShortTermTasksSuccess(res.data.shortTermTasks));
			return res.data.shortTermTasks;
		} catch (error) {
			dispatch(setShortTermTasksFailed(error));
			errorApi(error);
		}
	};

	return getShortTermTasks;
};
