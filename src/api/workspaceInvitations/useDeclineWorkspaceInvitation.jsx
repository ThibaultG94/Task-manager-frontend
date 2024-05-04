import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useDeclineWorkspaceInvitation = () => {
	const errorApi = useErrorApi();

	const declineWorkspaceInvitation = async (invitationId, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaceInvitations/${invitationId}/decline`,
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

	return declineWorkspaceInvitation;
};
