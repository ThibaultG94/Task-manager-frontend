import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setUrgentTasks,
	setUrgentTasksFailed,
	setUrgentTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetUrgentTasks = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getUrgentTasks = async (userId) => {
		dispatch(setUrgentTasks());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/urgent`, {
				withCredentials: true,
			});
			dispatch(setUrgentTasksSuccess(res.data.urgentTasks));
		} catch (error) {
			dispatch(setUrgentTasksFailed(error));
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

	return getUrgentTasks;
};
