import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	editWorkspaceAction,
	editWorkspaceFailed,
	editWorkspaceSuccess,
} from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useEditWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const editWorkspace = async (workspace) => {
		dispatch(editWorkspaceAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaces/${workspace._id}`,
				workspace,
				{
					withCredentials: true,
				}
			);
			dispatch(editWorkspaceSuccess(res.data.workspace));
			return res.data.workspace;
		} catch (error) {
			dispatch(editWorkspaceFailed(error));
			errorApi(error);
			console.error(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return editWorkspace;
};