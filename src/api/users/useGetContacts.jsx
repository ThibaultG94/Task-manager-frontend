import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	setUserContactsAction,
	setUserContactsFailed,
	setUserContactsSuccess,
} from '../../store/feature/users.slice';
import axios from 'axios';

export const useGetContacts = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getContacts = async (userId) => {
		dispatch(setUserContactsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/users/${userId}/contacts`, {
				withCredentials: true,
			});
			dispatch(setUserContactsSuccess(res.data.userContacts));
			return res.data.userContacts;
		} catch (error) {
			dispatch(setUserContactsFailed(error));
			errorApi(error);
		}
	};

	return getContacts;
};
