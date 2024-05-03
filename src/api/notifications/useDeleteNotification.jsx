import axios from 'axios';
import { useErrorApi } from '../../utils/useErrorApi';

export const useDeleteNotification = () => {
    const errorApi = useErrorApi();

    const deleteNotification = async (notificationId) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            await axios.delete(`${API_URL}/notifications/delete-notification/${notificationId}`, {
                withCredentials: true,
            });
        } catch (error) {
            errorApi(error);
        }
    };

    return deleteNotification;
};