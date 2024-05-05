import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';
import { setReceivedWorkspaceInvitations } from '../../store/feature/workspaceInvitation.slice';
import { useDispatch } from 'react-redux';

export const useDeclineWorkspaceInvitation = () => {
	const dispatch = useDispatch();
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
			dispatch(
				setReceivedWorkspaceInvitations(
					res.data.workspaceInvitations
				)
			);
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return declineWorkspaceInvitation;
};
