import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWorkspaceTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspaceTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspaceTasks = async (workspaceId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/tasks/workspace/${workspaceId}`,
				{
					withCredentials: true,
				}
			);

			dispatch(setWorkspaceTasks(res.data));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getWorkspaceTasks;
};
