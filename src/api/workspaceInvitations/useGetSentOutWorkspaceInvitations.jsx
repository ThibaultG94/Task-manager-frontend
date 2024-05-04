import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSendOutWorkspaceInvitations } from '../../store/feature/workspaceInvitation.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetSentOutWorkspaceInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getSendOutWorkspaceInvitations = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/workspaceInvitations/sentout-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(
				setSendOutWorkspaceInvitations(
					res.data.workspaceInvitations
				)
			);
			return res.data.workspaceInvitations;
		} catch (error) {
			errorApi(error);
		}
	};

	return getSendOutWorkspaceInvitations;
};
