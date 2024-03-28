import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	cancelWorkspaceInvitationAction,
	cancelWorkspaceInvitationFailure,
	cancelWorkspaceInvitationSuccess,
} from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useCancelWorkspaceInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const cancelWorkspaceInvitation = async (invitationId) => {
		dispatch(cancelWorkspaceInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.delete(
				`${API_URL}/workspaceInvitations/${invitationId}/cancel`,
				{
					withCredentials: true,
				}
			);
			dispatch(cancelWorkspaceInvitationSuccess(res));
			return res;
		} catch (error) {
			dispatch(cancelWorkspaceInvitationFailure(error));
			errorApi(error);
		}
	};

	return cancelWorkspaceInvitation;
};
