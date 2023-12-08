import { useDispatch } from 'react-redux';
import {
	createTaskAction,
	createTaskFailed,
	createTaskSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

export const useCreateTask = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

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
					archived: task.archived,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(createTaskSuccess(res.data.task));
			return res.data.task;
		} catch (error) {
			dispatch(createTaskFailed(error));
			errorApi(error);
		}
	};

	return createTask;
};
