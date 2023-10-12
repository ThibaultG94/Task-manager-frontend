import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setTaskFailed,
	setTaskSuccess,
	setTasksAction,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetUserTasks = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getUserTasks = async (userId) => {
		dispatch(setTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/all-tasks`, {
				withCredentials: true,
			});
			dispatch(setTaskSuccess(res.data.userTasks));
		} catch (error) {
			dispatch(setTaskFailed(error));
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

	return getUserTasks;
};
