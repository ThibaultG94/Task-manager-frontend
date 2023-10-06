import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import Calendar from '../components/dashboard/Calendar';
import UrgentTasks from '../components/dashboard/UrgentTasks';
import ListWorkspaces from '../components/dashboard/ListWorkspaces';
import Activities from '../components/dashboard/Activities';
import Coworkers from '../components/dashboard/Coworkers';

const Dashboard = () => {
	return (
		<div className="flex">
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<div className="w-full p-2.5">
				<Header />
				<main className="dashboard-container">
					<Calendar />
					<UrgentTasks />
					<ListWorkspaces />
					<Activities />
					<Coworkers />
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
