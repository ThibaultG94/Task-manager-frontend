import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReceivedWorkspaceInvitations } from '../../store/feature/workspaceInvitation.slice';
import { setWorkspacesSuccess } from '../../store/feature/workspaces.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useAcceptWorkspaceInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const acceptWorkspaceInvitation = async (invitationId, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaceInvitations/${invitationId}/accept`,
				{ userId },
				{
					withCredentials: true,
				}
			);
			dispatch(
				setReceivedWorkspaceInvitations(
					res.data.workspaceInvitations
				)
			);
			dispatch(setWorkspacesSuccess(res.data.workspaces));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return acceptWorkspaceInvitation;
};
