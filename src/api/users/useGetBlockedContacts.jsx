import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserBlockedContacts } from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetBlockedContacts = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getBlockedContacts = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/users/${userId}/contacts-blocked`, {
				withCredentials: true,
			});
			dispatch(setUserBlockedContacts(res.data.userBlockedContacts));
			return res.data.userBlockedContacts;
		} catch (error) {
			errorApi(error);
		}
	};

	return getBlockedContacts;
};
