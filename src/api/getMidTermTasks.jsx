import { useDispatch } from 'react-redux';
import {
	setMidTermTasks,
	setMidTermTasksFailed,
	setMidTermTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useGetMidTermTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getMidTermTasks = async (userId) => {
		dispatch(setMidTermTasks());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/mid-term`, {
				withCredentials: true,
			});
			dispatch(setMidTermTasksSuccess(res.data.midTermTasks));
			return res.data.midTermTasks;
		} catch (error) {
			dispatch(setMidTermTasksFailed(error));
			errorApi(error);
		}
	};

	return getMidTermTasks;
};
