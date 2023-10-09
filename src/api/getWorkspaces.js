import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setWorkspaces,
	setWorkspacesFailed,
	setWorkspacesSuccess,
} from '../store/feature/workspaces.slice';
import axios from 'axios';

export const useGetWorkspaces = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			const errorCode = error.response ? error.response.status : 500;
			switch (errorCode) {
				case 404:
					navigate('/pages/error-404');
					break;
				case 500:
					navigate('/pages/error-500');
					break;
				default:
					navigate('/pages/error');
					break;
			}
		}
	};

	return getWorkspaces;
};
