import React from 'react';
import SideBar from '../components/sidebar/SideBar';

const Dashboard = () => {
	return (
		<div className="flex">
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<main className="w-full p-2.5"></main>
		</div>
	);
};

export default Dashboard;
