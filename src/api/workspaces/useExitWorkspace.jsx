import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	editWorkspaceAction,
	editWorkspaceFailed,
	editWorkspaceSuccess,
	setWorkspacesSuccess,
} from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useExitWorkspace = () => {
    const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const exitWorkspace = async (workspaceId) => {
        dispatch(editWorkspaceAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaces/${workspaceId}/exit`,
                {},
				{
					withCredentials: true,
				}
			);
			dispatch(setWorkspacesSuccess(res.data.workspaces));
			return res;
		} catch (error) {
            dispatch(editWorkspaceFailed(error));
			errorApi(error);
			console.error(error);
			throw new Error('Échec de la mise à jour de la tâche');
		}
	};

	return exitWorkspace;
};
