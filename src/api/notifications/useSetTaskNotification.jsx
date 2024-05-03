import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useSetTaskNotification = () => {
	const errorApi = useErrorApi();

	const setTaskNotification = async (task, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/notifications/set-notification`,
				{
					creatorId: userId,
					taskId: task._id,
					type: 'taskUpdate',
					workspaceId: task.workspaceId,
				},
				{
					withCredentials: true,
				}
			);
			return res.data.notificationsIds;
		} catch (error) {
			errorApi(error);
		}
	};

	return setTaskNotification;
};
