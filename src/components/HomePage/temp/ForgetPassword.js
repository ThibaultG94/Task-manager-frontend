const sendResetEmail = () => {
	const form = document.getElementById('forget-form');
	const span = document.getElementById('text-forget');

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const email = e.target.elements['email'].value;

		axios
			.post('http://localhost:5000/users/auth/forgot-password', {
				email: email,
			})
			.then((res) => {
				span.textContent = `Bonjour ${res.data.username}, nous allons vous envoyer un mail avec un nouveau mot de passe, restez vigilant ! `;
			})
			.catch((err) => console.error('Error with ForgetPassword', err));
	});
};

sendResetEmail();
