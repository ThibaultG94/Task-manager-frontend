import axios from 'axios';

export default async function getUserId(API_URL) {
	const res = await axios.get(`${API_URL}/users/my-account`, {
		withCredentials: true,
	});
	return res.data.user._id;
}
