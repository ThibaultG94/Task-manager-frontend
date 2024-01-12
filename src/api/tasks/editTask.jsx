import { useDispatch } from 'react-redux';
import {
	editTaskAction,
	editTaskFailed,
	editTaskSuccess,
} from '../../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../../components/utils/ErrorApi';

export const useEditTask = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

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
			errorApi(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return editTask;
};
