import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { markConversationAsRead } from '../../store/feature/conversations.slice';
import { useGetUserId } from '../users/useGetUserId';

export const useMarkConversationAsRead = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();
    const getUserId = useGetUserId();

    const readConversation = async (conversationId) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.put(`${API_URL}/conversations/${conversationId}/mark-conversation-as-read`, 
            { },
            {
                withCredentials: true,
            });
            const userId = await getUserId();
            dispatch(markConversationAsRead({ conversationId, userId }));
            return res;
        } catch (error) {
            errorApi(error);
            throw new Error('Échec de la récupération des commentaires');
        }
    }

    return readConversation;
};