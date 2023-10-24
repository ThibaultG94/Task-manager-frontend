import { useDispatch } from 'react-redux';
import {
	setLongTermTasks,
	setLongTermTasksFailed,
	setLongTermTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useGetLongTermTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getLongTermTasks = async (userId) => {
		dispatch(setLongTermTasks());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/long-term`, {
				withCredentials: true,
			});
			dispatch(setLongTermTasksSuccess(res.data.longTermTasks));
			return res.data.longTermTasks;
		} catch (error) {
			dispatch(setLongTermTasksFailed(error));
			errorApi(error);
		}
	};

	return getLongTermTasks;
};
