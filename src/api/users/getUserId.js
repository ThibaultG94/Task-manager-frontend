import axios from 'axios';

export default async function getUserId(API_URL) {
	let userId;
	if (sessionStorage.getItem('userId')) {
		userId = sessionStorage.getItem('userId');
	} else {
		const res = await axios.get(`${API_URL}/users/my-account`, {
			withCredentials: true,
		});
		userId = res.data.user._id;
		sessionStorage.setItem('userId', userId);
	}
	return userId;
}
