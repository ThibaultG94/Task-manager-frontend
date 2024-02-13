import { useDispatch } from 'react-redux';
import axios from 'axios';
import { sendWorkspaceInvitationAction } from '../../store/feature/workspaceInvitation.slice';

export const useSendInvitationWorkspace = () => {
	const dispatch = useDispatch();

	const sendInvitationWorkspace = async (invitation) => {
		dispatch(sendWorkspaceInvitationAction());

		const API_URL = process.env.REACT_APP_API_URL;
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
		return res;
	};

	return sendInvitationWorkspace;
};
