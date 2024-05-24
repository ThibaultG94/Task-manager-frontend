import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { setConversations } from '../../store/feature/conversations.slice';

export const useGetConversations = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();

    const getConversations = async () => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.get(`${API_URL}/conversations/`, {
                withCredentials: true,
            });
            dispatch(setConversations(res.data.userConversations));
            return res.data.userConversations;
        } catch (error) {
            errorApi(error);
            throw new Error('Échec de la récupération des commentaires');
        }
    }

    return getConversations;
};