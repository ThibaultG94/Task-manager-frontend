import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setShortTermTasks,
	setShortTermTasksFailed,
	setShortTermTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetShortTermTasks = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	return getShortTermTasks;
};
