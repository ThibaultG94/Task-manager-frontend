import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setWorkspacesAction } from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetWorkspaces = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getWorkspaces = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaces/user/${userId}`,
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

	return getWorkspaces;
};
