import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	cancelInvitationAction,
	cancelInvitationFailure,
	cancelInvitationSuccess,
} from '../../store/feature/invitations.slice';
import axios from 'axios';

export const useCancelInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const cancelInvitation = async (invitationId) => {
		dispatch(cancelInvitationAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.delete(
				`${API_URL}/invitations/${invitationId}/cancel`,
				{
					withCredentials: true,
				}
			);
			dispatch(cancelInvitationSuccess(res));
			return res;
		} catch (error) {
			dispatch(cancelInvitationFailure(error));
			errorApi(error);
		}
	};

	return cancelInvitation;
};
