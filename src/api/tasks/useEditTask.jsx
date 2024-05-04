import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEditedTask } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useEditTask = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const editTask = async (task) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(`${API_URL}/tasks/${task._id}`, task, {
				withCredentials: true,
			});
			dispatch(setEditedTask(res.data.task));
			return res.data.task;
		} catch (error) {
			errorApi(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return editTask;
};
