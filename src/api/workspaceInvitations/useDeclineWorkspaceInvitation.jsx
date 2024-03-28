import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	declineWorkspaceInvitationAction,
	declineWorkspaceInvitationFailure,
	declineWorkspaceInvitationSuccess,
} from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useDeclineWorkspaceInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const declineWorkspaceInvitation = async (invitationId, userId) => {
		dispatch(declineWorkspaceInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/workspaceInvitations/${invitationId}/decline`,
				{ userId },
				{
					withCredentials: true,
				}
			);
			dispatch(declineWorkspaceInvitationSuccess(res));
			return res;
		} catch (error) {
			dispatch(declineWorkspaceInvitationFailure(error));
			errorApi(error);
		}
	};

	return declineWorkspaceInvitation;
};
