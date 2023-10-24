import { useDispatch } from 'react-redux';
import {
	setWorkspaces,
	setWorkspacesFailed,
	setWorkspacesSuccess,
} from '../store/feature/workspaces.slice';
import axios from 'axios';
import { useErrorApi } from '../components/utils/ErrorApi';

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

			dispatch(setWorkspacesSuccess(res.data));
		} catch (error) {
			dispatch(setWorkspacesFailed(error));
			errorApi(error);
		}
	};

	return getWorkspaces;
};
