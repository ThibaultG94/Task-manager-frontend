import axios from 'axios';

export default async function getUserId(API_URL) {
	const res = await axios.get(`${API_URL}/users/my-account`, {
		withCredentials: true,
	});
	const userId = res.data.user._id;
	sessionStorage.setItem('userId', userId);
	return userId;
}
