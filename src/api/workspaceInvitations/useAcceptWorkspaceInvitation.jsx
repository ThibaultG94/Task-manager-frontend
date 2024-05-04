import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useAcceptWorkspaceInvitation = () => {
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
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return acceptWorkspaceInvitation;
};
