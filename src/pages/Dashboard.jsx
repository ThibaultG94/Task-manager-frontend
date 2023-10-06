import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';

const Dashboard = () => {
	return (
		<div className="flex">
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<div className="w-full p-2.5">
				<Header />
			</div>
		</div>
	);
};

export default Dashboard;
