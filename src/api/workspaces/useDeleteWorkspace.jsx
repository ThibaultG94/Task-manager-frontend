import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	deleteWorkspaceAction,
	deleteWorkspaceFailed,
	deleteWorkspaceSuccess,
	setWorkspacesSuccess,
} from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useDeleteWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const deleteWorkspace = async (workspaceId) => {
		dispatch(deleteWorkspaceAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.delete(
				`${API_URL}/workspaces/${workspaceId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setWorkspacesSuccess(res.data.workspaces));
			return res.data;
		} catch (error) {
			dispatch(deleteWorkspaceFailed(error));
			errorApi(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return deleteWorkspace;
};
