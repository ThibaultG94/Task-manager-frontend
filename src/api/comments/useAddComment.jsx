import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setEditedTask } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

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
            dispatch(setEditedTask(res.data.task));
            console.log(res.data.task);
            return res.data.task;
        } catch (error) {
            errorApi(error);
            throw new Error('Échec de l\'ajout du commentaire');
        }
    };

    return addComment;
};
