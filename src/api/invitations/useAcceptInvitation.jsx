import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	acceptInvitationAction,
	acceptInvitationFailure,
	acceptInvitationSuccess,
} from '../../store/feature/invitations.slice';
import { useErrorApi } from '../../utils/useErrorApi';

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
			console.log('res from acceptInvitation', res);
			return res;
		} catch (error) {
			dispatch(acceptInvitationFailure(error));
			errorApi(error);
		}
	};

	return acceptInvitation;
};
