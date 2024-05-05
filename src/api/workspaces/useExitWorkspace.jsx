import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWorkspacesAction } from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useExitWorkspace = () => {
    const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const exitWorkspace = async (workspaceId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaces/${workspaceId}/exit`,
                {},
				{
					withCredentials: true,
				}
			);
			dispatch(setWorkspacesAction(res.data.workspaces));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return exitWorkspace;
};
