import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
	getTipsAction,
	getTipsFailure,
	getTipsSuccess,
} from '../../store/feature/tips.slice';
import { useErrorApi } from '../../utils/useErrorApi';

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
