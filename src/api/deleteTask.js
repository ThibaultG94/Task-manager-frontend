import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	deleteTaskAction,
	deleteTaskFailed,
	deleteTaskSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useDeleteTask = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const deleteTask = async (taskId) => {
		dispatch(deleteTaskAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.delete(`${API_URL}/task/${taskId}`, {
				withCredentials: true,
			});
			dispatch(deleteTaskSuccess(res.data));
			return res.data;
		} catch (error) {
			dispatch(deleteTaskFailed(error));
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
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return deleteTask;
};
