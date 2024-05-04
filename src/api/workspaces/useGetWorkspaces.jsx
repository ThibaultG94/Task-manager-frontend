import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setWorkspaces,
	setWorkspacesFailed,
	setWorkspacesSuccess,
} from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspaces = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspaces = async (userId) => {
		dispatch(setWorkspaces());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaces/user/${userId}`,
				{
					withCredentials: true,
				}
			);

			dispatch(setWorkspacesSuccess(res.data.workspaces));
		} catch (error) {
			dispatch(setWorkspacesFailed(error));
			errorApi(error);
		}
	};

	return getWorkspaces;
};
