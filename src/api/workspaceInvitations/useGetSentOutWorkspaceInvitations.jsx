import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setSendOutWorkspaceInvitationsAction,
	setSendOutWorkspaceInvitationsFailure,
	setSendOutWorkspaceInvitationsSuccess,
} from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetSentOutWorkspaceInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getSendOutWorkspaceInvitations = async (userId) => {
		dispatch(setSendOutWorkspaceInvitationsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaceInvitations/sentout-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(
				setSendOutWorkspaceInvitationsSuccess(
					res.data.workspaceInvitations
				)
			);
			return res.data.workspaceInvitations;
		} catch (error) {
			dispatch(setSendOutWorkspaceInvitationsFailure(error));
			errorApi(error);
		}
	};

	return getSendOutWorkspaceInvitations;
};
