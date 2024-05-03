import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReceivedInvitationsSuccess } from '../../store/feature/invitations.slice';
import { setUserContactsSuccess } from '../../store/feature/users.slice';
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
			dispatch(setReceivedInvitationsSuccess(res.data.invitations));
			dispatch(setUserContactsSuccess(res.data.userContacts));
			return res.data.invitations;
		} catch (error) {
			errorApi(error);
		}
	};

	return acceptInvitation;
};
