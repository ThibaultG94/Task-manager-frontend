import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetUser = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getUser = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/users/${userId}/account`, {
				withCredentials: true,
			});
			dispatch(setUserData(res.data.user));
			return res.data.user;
		} catch (error) {
			errorApi(error);
		}
	};

	return getUser;
};
