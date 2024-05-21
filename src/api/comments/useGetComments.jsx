import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { setComments } from '../../store/feature/comments.slice';

export const useGetComments = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();

    const getComments = async (taskId) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.get(`${API_URL}/comments/task/${taskId}`, {
                withCredentials: true,
            });
            dispatch(setComments(res.data.comments));
            return res.data.comments;
        } catch (error) {
            errorApi(error);
            throw new Error('Échec de la récupération des commentaires');
        }
    }

    return getComments;
};