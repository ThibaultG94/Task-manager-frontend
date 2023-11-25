import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import {
	setWorkspaceTaskStatusCountAction,
	setWorkspaceTaskStatusCountFailed,
	setWorkspaceTaskStatusCountSuccess,
} from '../store/feature/tasks.slice';
import axios from 'axios';

export const useGetWorkspaceTaskStatusCount = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspaceTaskStatusCount = async (workspaceId) => {
		dispatch(setWorkspaceTaskStatusCountAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/task/workspace/${workspaceId}/status-count`,
				{
					withCredentials: true,
				}
			);

			dispatch(setWorkspaceTaskStatusCountSuccess(res.data));
			return res.data;
		} catch (error) {
			dispatch(setWorkspaceTaskStatusCountFailed(error));
			errorApi(error);
		}
	};

	return getWorkspaceTaskStatusCount;
};
