import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setMidTermTasks,
	setMidTermTasksFailed,
	setMidTermTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetMidTermTasks = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	return getMidTermTasks;
};
