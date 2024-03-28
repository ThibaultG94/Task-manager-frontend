import axios from 'axios';
import { useDispatch } from 'react-redux';
import { sendInvitationAction } from '../../store/feature/invitations.slice';

export const useSendInvitation = () => {
	const dispatch = useDispatch();

	const sendInvitation = async (invitation) => {
		dispatch(sendInvitationAction());

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
		return res;
	};

	return sendInvitation;
};
