import axios from 'axios';

export default async function register(API_URL, pseudo, email, password) {
	const res = await axios.post(`${API_URL}/users/register`, {
		username: pseudo,
		email: email,
		password: password,
		role: 'user',
	});

	const user = res.data.user;
}
