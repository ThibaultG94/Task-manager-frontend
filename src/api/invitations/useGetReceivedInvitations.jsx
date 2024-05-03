import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setReceivedInvitations } from '../../store/feature/invitations.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetReceivedInvitations = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getReceivedInvitations = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/invitations/received-invitations/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(setReceivedInvitations(res.data.invitations));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getReceivedInvitations;
};
