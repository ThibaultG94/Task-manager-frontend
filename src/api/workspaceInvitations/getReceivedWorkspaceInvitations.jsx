import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	setReceivedWorkspaceInvitationsAction,
	setReceivedWorkspaceInvitationsFailure,
	setReceivedWorkspaceInvitationsSuccess,
} from '../../store/feature/workspaceInvitations.slice';
import axios from 'axios';

export const useGetReceivedWorkspaceInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getReceivedWorkspaceInvitations = async (userId) => {
		dispatch(setReceivedWorkspaceInvitationsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaceInvitations/received-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(
				setReceivedWorkspaceInvitationsSuccess(
					res.data.workspaceInvitations
				)
			);
			return res.data.workspaceInvitations;
		} catch (error) {
			dispatch(setReceivedWorkspaceInvitationsFailure(error));
			errorApi(error);
		}
	};

	return getReceivedWorkspaceInvitations;
};
