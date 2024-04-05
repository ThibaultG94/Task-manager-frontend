import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setSingleWorkspace,
	setSingleWorkspaceFailed,
	setSingleWorkspaceSuccess,
} from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspace = async (workspaceId) => {
		dispatch(setSingleWorkspace());
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaces/${workspaceId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setSingleWorkspaceSuccess(res.data));
			console.log(res.data);
			return res.data;
		} catch (error) {
			dispatch(setSingleWorkspaceFailed(error));
			errorApi(error);
		}
	};

	return getWorkspace;
};
