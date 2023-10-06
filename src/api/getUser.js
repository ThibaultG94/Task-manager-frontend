import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	setUserDataFailed,
	setUserDataSuccess,
} from '../store/feature/users.slice';

export const useGetUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const getUser = async (userId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(`${API_URL}/users/${userId}/account`, {
				withCredentials: true,
			});
			dispatch(setUserDataSuccess(res.data.user));
		} catch (error) {
			dispatch(setUserDataFailed(error));
			const errorCode = error.response ? error.response.status : 500;
			switch (errorCode) {
				case 404:
					navigate('/pages/error-404');
					break;
				case 500:
					navigate('/pages/error-500');
					break;
				default:
					navigate('/pages/error');
					break;
			}
		}
	};

	return getUser;
};
