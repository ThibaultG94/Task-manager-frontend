import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReceivedInvitations } from '../../store/feature/invitations.slice';
import { setUserContacts } from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useAcceptInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const acceptInvitation = async (invitationId, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/invitations/${invitationId}/accept`,
				{ userId },
				{
					withCredentials: true,
				}
			);
			dispatch(setReceivedInvitations(res.data.invitations));
			dispatch(setUserContacts(res.data.userContacts));
			return res.data.invitations;
		} catch (error) {
			errorApi(error);
		}
	};

	return acceptInvitation;
};
