import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleWorkspaceAction } from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspace = async (workspaceId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaces/${workspaceId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setSingleWorkspaceAction(res.data.workspace));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getWorkspace;
};
