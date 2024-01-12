import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	acceptInvitationAction,
	acceptInvitationFailure,
	acceptInvitationSuccess,
} from '../../store/feature/invitations.slice';
import axios from 'axios';

export const useAcceptInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const acceptInvitation = async (invitationId, userId) => {
		dispatch(acceptInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/invitations/${invitationId}/accept`,
				{ userId },
				{
					withCredentials: true,
				}
			);
			dispatch(acceptInvitationSuccess(res));
			return res;
		} catch (error) {
			dispatch(acceptInvitationFailure(error));
			errorApi(error);
		}
	};

	return acceptInvitation;
};
