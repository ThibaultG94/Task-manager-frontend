import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setArchivedTasks,
	setArchivedTasksFailed,
	setArchivedTasksSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetArchivedTasks = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getArchivedTasks = async (userId) => {
		dispatch(setArchivedTasks());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/task/${userId}/archived`, {
				withCredentials: true,
			});
			dispatch(setArchivedTasksSuccess(res.data.archivedTasks));
			console.log(res.data.archivedTasks);
			return res.data.archivedTasks;
		} catch (error) {
			dispatch(setArchivedTasksFailed(error));
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

	return getArchivedTasks;
};
