import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import {
	setReceivedInvitationsAction,
	setReceivedInvitationsFailure,
	setReceivedInvitationsSuccess,
} from '../store/feature/invitations.slice';
import axios from 'axios';

export const useGetReceivedInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getReceivedInvitations = async (userId) => {
		dispatch(setReceivedInvitationsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/invitations/received-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setReceivedInvitationsSuccess(res.data.invitations));
			return res.data.invitations;
		} catch (error) {
			dispatch(setReceivedInvitationsFailure(error));
			errorApi(error);
		}
	};

	return getReceivedInvitations;
};
