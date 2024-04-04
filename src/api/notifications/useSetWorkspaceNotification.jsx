import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useSetWorkspaceNotification = () => {
	const errorApi = useErrorApi();

	const setWorkspaceNotification = async (workspace, userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.post(
				`${API_URL}/notifications/set-notification`,
				{
					creatorId: userId,
					workspaceId: workspace._id,
					type: 'workspaceUpdate',
				},
				{
					withCredentials: true,
				}
			);
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return setWorkspaceNotification;
};
