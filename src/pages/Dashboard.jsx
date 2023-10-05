import React from 'react';
import SideBar from '../components/SideBar';

const Dashboard = () => {
	return (
		<div className="flex">
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
		</div>
	);
};

export default Dashboard;
