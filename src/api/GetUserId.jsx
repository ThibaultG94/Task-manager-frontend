import axios from 'axios';
import { useHistory } from 'react-router-dom';

const GetUserId = async () => {
	try {
		const API_URL = process.env.REACT_APP_API_URL;
		const res = await axios.get(`${API_URL}/users/my-account`, {
			withCredentials: true,
		});
		return res.data.user._id;
	} catch (error) {
		const history = useHistory();
		const errorCode = error.response ? error.response.status : null;

		switch (errorCode) {
			case 401:
				history.push('/home');
				break;
			case 500:
				history.push('/pages/error-500');
				break;
			case 404:
				history.push('/pages/error-404');
				break;
			default:
				history.push('/pages/error');
				break;
		}
	}
};

export default GetUserId;
