import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWorkspaceTaskStatusCount } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspaceTaskStatusCount = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspaceTaskStatusCount = async (workspaceId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/workspace/${workspaceId}/status-count`,
				{
					withCredentials: true,
				}
			);

			dispatch(setWorkspaceTaskStatusCount(res.data));
			return res.data;
		} catch (error) {
			errorApi(error);
			return error;
		}
	};

	return getWorkspaceTaskStatusCount;
};
