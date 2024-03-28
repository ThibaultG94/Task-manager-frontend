import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	markNotificationAsReadAction,
	markNotificationAsReadFailure,
	markNotificationAsReadSuccess,
} from '../../store/feature/notifications.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useMarkNotificationAsRead = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const markNotificationAsRead = async (userId, notificationId) => {
		dispatch(markNotificationAsReadAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/notifications/mark-read/${notificationId}`,
				{
					userId,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(markNotificationAsReadSuccess(notificationId));
			return res;
		} catch (error) {
			dispatch(markNotificationAsReadFailure(error));
			errorApi(error);
		}
	};

	return markNotificationAsRead;
};
