import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	createWorkspaceAction,
	createWorkspaceFailed,
	createWorkspaceSuccess,
} from '../store/feature/workspaces.slice';
import axios from 'axios';

export const useCreateWorkspace = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const createWorkspace = async (workspace, userId) => {
		dispatch(createWorkspaceAction());

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
			dispatch(createWorkspaceSuccess(res.data.workspace));
			return res.data.workspace;
		} catch (error) {
			dispatch(createWorkspaceFailed(error));
			const errorCode = error.response ? error.response.status : 500;
			switch (errorCode) {
				case 401:
					navigate('/');
					break;
				case 404:
					navigate('/pages/error-404');
					break;
				case 500:
					navigate('/pages/error-500');
					break;
				default:
					navigate('/pages/error');
					break;
			}
		}
	};

	return createWorkspace;
};
