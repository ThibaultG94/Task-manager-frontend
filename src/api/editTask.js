import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	editTaskAction,
	editTaskFailed,
	editTaskSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useEditTask = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const editTask = async (task) => {
		dispatch(editTaskAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(`${API_URL}/task/${task._id}`, task, {
				withCredentials: true,
			});
			dispatch(editTaskSuccess(res.data.task));
			return res.data.task;
		} catch (error) {
			dispatch(editTaskFailed(error));
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

	return editTask;
};
