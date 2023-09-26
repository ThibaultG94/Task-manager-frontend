import React from 'react';
import LoginForm from '../components/home/LoginForm';

const Home = () => {
	return (
		<div className="flex items-center justify-center">
			<main className="min-w-full min-h-screen grid grid-cols-[45%_55%]">
				<LoginForm />
			</main>
		</div>
	);
};

export default Home;
