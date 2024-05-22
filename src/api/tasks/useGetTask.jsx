import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSingleTask } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetTask = () => {
    const dispatch = useDispatch();
    const errorApi = useErrorApi();

    const getTask = async (taskId) => {
        try {
            const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tasks/${taskId}`, {
				withCredentials: true,
			});
            dispatch(setSingleTask(res.data.task));
            return res.data.task;
        } catch (error) {
            errorApi(error);
        }
    };

    return getTask;
};