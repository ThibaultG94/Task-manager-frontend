import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	getNotificationsAction,
	getNotificationsFailure,
	getNotificationsSuccess,
} from '../../store/feature/notifications.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetNotifications = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getNotifications = async (userId) => {
		dispatch(getNotificationsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/notifications/get-notifications/${userId}`,
				{
					withCredentials: true,
				}
			);
			dispatch(
				getNotificationsSuccess({
					newNotifications: res.data.newNotifications,
					earlierNotifications: res.data.earlierNotifications,
				})
			);
			return res.data;
		} catch (error) {
			dispatch(getNotificationsFailure(error));
			errorApi(error);
		}
	};

	return getNotifications;
};
