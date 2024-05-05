import axios from 'axios';
import { setSendOutWorkspaceInvitations } from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';
import { useDispatch } from 'react-redux';
import { setWorkspacesSuccess } from '../../store/feature/workspaces.slice';

export const useCancelWorkspaceInvitation = () => {
	const dispatch = useDispatch();
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
			dispatch(
				setSendOutWorkspaceInvitations(
					res.data.workspaceInvitations
				)
			);
			dispatch(setWorkspacesSuccess(res.data.workspaces));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return cancelWorkspaceInvitation;
};
