import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBecomingTasks } from '../../store/feature/tasks.slice';
import { useErrorApi } from '../../utils/useErrorApi';

export const useGetBecomingTasks = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getBecomingTasks = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tasks/${userId}/becoming`, {
				withCredentials: true,
			});
			dispatch(setBecomingTasks(res.data.becomingTasks));
			return res;
		} catch (error) {
			errorApi(error);
		}
	};

	return getBecomingTasks;
};
