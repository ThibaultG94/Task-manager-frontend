import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSendOutWorkspaceInvitations } from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';
import { setWorkspacesSuccess } from '../../store/feature/workspaces.slice';

export const useSendInvitationWorkspace = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const sendInvitationWorkspace = async (invitation) => {
		const API_URL = process.env.REACT_APP_API_URL;

		try {
			const res = await axios.post(
				`${API_URL}/workspaceInvitations/send-invitation/`,
				{
					senderId: invitation.userId,
					guestId: invitation.contactId,
					role: invitation.role,
					workspaceId: invitation.workspaceId,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(
				setSendOutWorkspaceInvitations(
					res.data.workspaceInvitations
				)
			);
			dispatch(setWorkspacesSuccess(res.data.workspaces));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return sendInvitationWorkspace;
};
