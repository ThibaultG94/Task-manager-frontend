import axios from 'axios';
import { useErrorApi } from '../../components/utils/ErrorApi';

export const useSetInvitationNotification = () => {
	const errorApi = useErrorApi();

	const setInvitationNotification = async (invitation, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/notifications/set-notification`,
				{
					creatorId: userId,
					invitationId: invitation._id,
					type: 'invitationUpdate',
				},
				{
					withCredentials: true,
				}
			);
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return setInvitationNotification;
};
