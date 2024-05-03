import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSendOutInvitations } from '../../store/feature/invitations.slice';

export const useSendInvitation = () => {
	const dispatch = useDispatch();

	const sendInvitation = async (invitation) => {
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
		dispatch(setSendOutInvitations(res.data.invitations));
		return res;
	};

	return sendInvitation;
};
