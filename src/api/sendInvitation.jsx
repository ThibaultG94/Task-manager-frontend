import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import {
	sendInvitationAction,
	sendInvitationFailure,
	sendInvitationSuccess,
} from '../store/feature/invitations.slice';
import axios from 'axios';

export const useSendInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const sendInvitation = async (invitation) => {
		dispatch(sendInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/invitations/send-invitation/`,
				{
					senderId: invitation.userId,
					guestEmail: invitation.email,
					message: invitation.message,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(sendInvitationSuccess(res.data.invitation));
		} catch (error) {
			dispatch(sendInvitationFailure(error));
			errorApi(error);
		}
	};

	return sendInvitation;
};
