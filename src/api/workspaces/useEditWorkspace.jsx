import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWorkspacesSuccess } from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useEditWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const editWorkspace = async (workspace) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaces/${workspace._id}`,
				workspace,
				{
					withCredentials: true,
				}
			);
			dispatch(setWorkspacesSuccess(res.data.workspaces));
			return res.data.workspace;
		} catch (error) {
			errorApi(error);
		}
	};

	return editWorkspace;
};
