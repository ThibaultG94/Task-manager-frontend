import { useDispatch } from 'react-redux';
import { useErrorApi } from '../components/utils/ErrorApi';
import {
	getTipsAction,
	getTipsFailure,
	getTipsSuccess,
} from '../store/feature/tips.slice';
import axios from 'axios';

export const useGetTips = () => {
	const dispatch = useDispatch();
	const errorApi = useErrorApi();

	const getTips = async () => {
		dispatch(getTipsAction());

		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/tips/get-tips`);
			dispatch(getTipsSuccess(res.data));
		} catch (error) {
			dispatch(getTipsFailure(error));
			errorApi(error);
		}
	};

	return getTips;
};
