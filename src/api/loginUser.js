import axios from 'axios';

export async function login(API_URL, email, password) {
	const res = await axios.post(`${API_URL}/users/login`, {
		email: email,
		password: password,
	});

	const token = res.data.token;
	const refreshToken = res.data.refreshToken;
	document.cookie = `token=${token}`;
	document.cookie = `refreshToken=${refreshToken}`;

	return res;
	// .then(async (res) => {

	// if (res.status === 200) {
	// 	const userId = await res.data.user.id;
	// 	try {
	// 		window.location.href = '/pages/dashboard.html';
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }
	// });
}
