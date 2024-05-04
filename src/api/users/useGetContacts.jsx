import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserContacts } from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetContacts = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getContacts = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/users/${userId}/contacts`, {
				withCredentials: true,
			});
			dispatch(setUserContacts(res.data.userContacts));
			return res.data.userContacts;
		} catch (error) {
			errorApi(error);
		}
	};

	return getContacts;
};
