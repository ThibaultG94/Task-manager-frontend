import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	createTaskAction,
	createTaskFailed,
	createTaskSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useCreateTask = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const createTask = async (task) => {
		dispatch(createTaskAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/task/`,
				{
					title: task.title,
					userId: task.userId,
					description: task.description,
					status: task.status,
					priority: task.priority,
					workspaceId: task.workspaceId,
					deadline: task.deadline,
					assignedTo: task.assignedTo,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(createTaskSuccess(res.data.task));
			return res.data.task;
		} catch (error) {
			dispatch(createTaskFailed(error));
			const errorCode = error.response ? error.response.status : 500;
			switch (errorCode) {
				case 401:
					// navigate('/');
					console.log('401');
					break;
				case 404:
					// navigate('/pages/error-404');
					console.log('404');
					break;
				case 500:
					// navigate('/pages/error-500');
					console.log('500');
					break;
				default:
					// navigate('/pages/error');
					console.log('default');
					break;
			}
		}
	};

	return createTask;
};
