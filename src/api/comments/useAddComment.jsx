import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useErrorApi } from '../../utils/useErrorApi';
import { setComments } from '../../store/feature/comments.slice';

export const useAddComment = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();

    const addComment = async (taskId, content) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await axios.post(
                `${API_URL}/comments/comment`,
                { taskId, content },
                {
                    withCredentials: true,
                }
            );
            dispatch(setComments(res.data.comments));
            return res.data.comments;
        } catch (error) {
            errorApi(error);
            throw new Error('Échec de l\'ajout du commentaire');
        }
    };

    return addComment;
};
