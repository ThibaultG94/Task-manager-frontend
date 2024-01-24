import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../components/utils/ErrorApi';
import {
	markNotificationsViewedAction,
	markNotificationsViewedFailure,
	markNotificationsViewedSuccess,
} from '../../store/feature/notifications.slice';
import axios from 'axios';

export const useMarkNotificationsAsViewed = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const markNotificationsAsViewed = async (userId, notificationsIds) => {
		dispatch(markNotificationsViewedAction());

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
			console.log(res);
			return res;
		} catch (error) {
			dispatch(markNotificationsViewedFailure(error));
			errorApi(error);
		}
	};

	return markNotificationsAsViewed;
};
