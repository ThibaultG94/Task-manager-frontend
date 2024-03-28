import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setSendOutInvitationsAction,
	setSendOutInvitationsSuccess,
	setSendOutInvitationsFailure,
} from '../../store/feature/invitations.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetSentOutInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getSendOutInvitations = async (userId) => {
		dispatch(setSendOutInvitationsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/invitations/sentout-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setSendOutInvitationsSuccess(res.data.invitations));
			return res.data.invitations;
		} catch (error) {
			dispatch(setSendOutInvitationsFailure(error));
			errorApi(error);
		}
	};

	return getSendOutInvitations;
};
