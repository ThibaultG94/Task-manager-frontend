import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReceivedWorkspaceInvitations } from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetReceivedWorkspaceInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getReceivedWorkspaceInvitations = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaceInvitations/received-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(
				setReceivedWorkspaceInvitations(
					res.data.workspaceInvitations
				)
			);
			return res.data.workspaceInvitations;
		} catch (error) {
			errorApi(error);
		}
	};

	return getReceivedWorkspaceInvitations;
};
