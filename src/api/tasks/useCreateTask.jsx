import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';

export const useCreateTask = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const createTask = async (task) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/tasks/`,
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
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return createTask;
};
