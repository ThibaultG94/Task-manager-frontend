import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setLongTermTasks,
	setLongTermTasksFailed,
	setLongTermTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetLongTermTasks = async () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			const errorCode = error.response ? error.response.status : 500;
			switch (errorCode) {
				case 401:
					navigate('/');
					break;
				case 404:
					navigate('/pages/error-404');
					break;
				case 500:
					navigate('/pages/error-500');
					break;
				default:
					navigate('/pages/error');
					break;
			}
		}
	};

	return getLongTermTasks;
};
