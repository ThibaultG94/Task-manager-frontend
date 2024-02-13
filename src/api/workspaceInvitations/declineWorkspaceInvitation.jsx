import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	declineWorkspaceInvitationAction,
	declineWorkspaceInvitationFailure,
	declineWorkspaceInvitationSuccess,
} from '../../store/feature/workspaceInvitations.slice';
import axios from 'axios';

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
