import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useCancelWorkspaceInvitation = () => {
	const errorApi = useErrorApi();

	const cancelWorkspaceInvitation = async (invitationId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.delete(
				`${API_URL}/workspaceInvitations/${invitationId}/cancel`,
				{
					withCredentials: true,
				}
			);
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return cancelWorkspaceInvitation;
};
