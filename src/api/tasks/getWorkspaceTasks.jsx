import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setWorkspaceTasksAction,
	setWorkspaceTasksFailed,
	setWorkspaceTasksSuccess,
} from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspaceTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspaceTasks = async (workspaceId) => {
		dispatch(setWorkspaceTasksAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/workspace/${workspaceId}`,
				{
					withCredentials: true,
				}
			);

			dispatch(setWorkspaceTasksSuccess(res.data));
		} catch (error) {
			dispatch(setWorkspaceTasksFailed(error));
			errorApi(error);
		}
	};

	return getWorkspaceTasks;
};
