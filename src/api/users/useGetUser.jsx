import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	setUserData,
	setUserDataFailed,
	setUserDataSuccess,
} from '../../store/feature/users.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetUser = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getUser = async (userId) => {
		dispatch(setUserData());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/users/${userId}/account`, {
				withCredentials: true,
			});
			dispatch(setUserDataSuccess(res.data.user));
			return res.data.user;
		} catch (error) {
			dispatch(setUserDataFailed(error));
			errorApi(error);
		}
	};

	return getUser;
};
