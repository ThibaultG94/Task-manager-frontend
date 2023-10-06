import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';
import DisplayTasks from '../components/tasks/DisplayTasks';

const Tasks = () => {
	return (
		<div className="flex">
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<div className="w-full p-2.5">
				<Header />
				<main>
					<DisplayTasks />
				</main>
			</div>
		</div>
	);
};

export default Tasks;
