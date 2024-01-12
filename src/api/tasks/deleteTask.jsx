import { useDispatch } from 'react-redux';
import {
	deleteTaskAction,
	deleteTaskFailed,
	deleteTaskSuccess,
} from '../../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../../components/utils/ErrorApi';

export const useDeleteTask = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

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
			errorApi(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return deleteTask;
};
