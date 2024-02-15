import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import axios from 'axios';
import {
	acceptWorkspaceInvitationAction,
	acceptWorkspaceInvitationFailure,
	acceptWorkspaceInvitationSuccess,
} from '../../store/feature/workspaceInvitation.slice';

export const useAcceptWorkspaceInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const acceptWorkspaceInvitation = async (invitationId, userId) => {
		dispatch(acceptWorkspaceInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaceInvitations/${invitationId}/accept`,
				{ userId },
				{
					withCredentials: true,
				}
			);
			dispatch(acceptWorkspaceInvitationSuccess(res));
			return res;
		} catch (error) {
			dispatch(acceptWorkspaceInvitationFailure(error));
			errorApi(error);
		}
	};

	return acceptWorkspaceInvitation;
};
