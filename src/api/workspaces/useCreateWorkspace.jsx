import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWorkspacesAction } from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useCreateWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const createWorkspace = async (workspace, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/workspaces/user/${userId}/create-workspace`,
				{
					title: workspace.title,
					userId: workspace.userId,
					description: workspace.description,
					members: workspace.members,
					isDefault: workspace.isDefault,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(setWorkspacesAction(res.data.workspaces));
			return res.data.workspace;
		} catch (error) {
			errorApi(error);
		}
	};

	return createWorkspace;
};
