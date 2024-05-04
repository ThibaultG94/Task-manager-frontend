import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useSendInvitationWorkspace = () => {
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
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return sendInvitationWorkspace;
};
