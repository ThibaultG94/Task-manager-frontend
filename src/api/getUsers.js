import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useGetUsers = () => {
	const navigate = useNavigate();

	const getUsers = async (workspaceId) => {
		try {
			const API_URL = process.env.REACT_APP_API_URL;
			const res = await axios.get(
				`${API_URL}/users/${workspaceId}/members`,
				{
					withCredentials: true,
				}
			);
			return res.data;
		} catch (error) {
			const errorCode = error.response ? error.response.status : 500;
			switch (errorCode) {
				case 404:
					navigate('/pages/error-404');
					break;
				case 500:
					navigate('/pages/error-500');
					break;
				default:
					// navigate('/pages/error');
					console.error('ERROR');
					break;
			}
		}
	};

	return getUsers;
};
