import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	declineInvitationAction,
	declineInvitationFailure,
	declineInvitationSuccess,
} from '../../store/feature/invitations.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useDeclineInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const declineInvitation = async (invitationId, userId) => {
		dispatch(declineInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/invitations/${invitationId}/decline`,
				{ userId },
				{
					withCredentials: true,
				}
			);
			dispatch(declineInvitationSuccess(res));
			return res;
		} catch (error) {
			dispatch(declineInvitationFailure(error));
			errorApi(error);
		}
	};

	return declineInvitation;
};
