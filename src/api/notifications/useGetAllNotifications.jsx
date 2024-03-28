import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	getAllNotificationsAction,
	getAllNotificationsFailure,
	getAllNotificationsSuccess,
} from '../../store/feature/notifications.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetAllNotifications = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getAllNotifications = async (userId, page, limit) => {
		dispatch(getAllNotificationsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/notifications/${userId}/get-all-notifications?page=${page}&limit=${limit}`,
				{
					withCredentials: true,
				}
			);
			dispatch(getAllNotificationsSuccess(res.data));
			return res.data;
		} catch (error) {
			dispatch(getAllNotificationsFailure(error));
			errorApi(error);
		}
	};

	return getAllNotifications;
};
