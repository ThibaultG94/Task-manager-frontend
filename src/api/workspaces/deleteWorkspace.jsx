import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	deleteWorkspaceAction,
	deleteWorkspaceFailed,
	deleteWorkspaceSuccess,
} from '../../store/feature/workspaces.slice';

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
			dispatch(deleteWorkspaceSuccess(res.data));
			return res.data;
		} catch (error) {
			dispatch(deleteWorkspaceFailed(error));
			errorApi(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return deleteWorkspace;
};
