import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	getAllNotificationsAction,
	getAllNotificationsFailure,
	getAllNotificationsSuccess,
} from '../../store/feature/notifications.slice';
import axios from 'axios';

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
