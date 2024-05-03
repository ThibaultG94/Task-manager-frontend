import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSendOutInvitationsSuccess } from '../../store/feature/invitations.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useCancelInvitation = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const cancelInvitation = async (invitationId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.delete(
				`${API_URL}/invitations/${invitationId}/cancel`,
				{
					withCredentials: true,
				}
			);
			dispatch(setSendOutInvitationsSuccess(res.data.invitations));
			return res.data;
		} catch (error) {
			errorApi(error);
		}
	};

	return cancelInvitation;
};
