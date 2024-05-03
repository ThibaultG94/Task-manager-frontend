import axios from 'axios';
import { useDispatch } from 'react-redux';
import { markNotificationsViewedSuccess } from '../../store/feature/notifications.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useMarkNotificationsAsViewed = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const markNotificationsAsViewed = async (userId, notificationsIds) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.put(
				`${API_URL}/notifications/mark-viewed/${userId}`,
				{
					notificationsIds,
				},
				{
					withCredentials: true,
				}
			);
			dispatch(markNotificationsViewedSuccess(notificationsIds));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return markNotificationsAsViewed;
};
