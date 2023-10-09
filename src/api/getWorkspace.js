import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setSingleWorkspace,
	setSingleWorkspaceFailed,
	setSingleWorkspaceSuccess,
} from '../store/feature/workspaces.slice';
import axios from 'axios';

export const useGetWorkspace = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
			return res.data;
		} catch (error) {
			dispatch(setSingleWorkspaceFailed(error));
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

	return getWorkspace;
};
