import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import Header from '../components/header/Header';

const Workspaces = () => {
	return (
		<div className="flex">
			<section className="bg-dark-blue text-white text-center">
				<SideBar />
			</section>
			<div className="w-full p-2.5">
				<Header />
				<main></main>
			</div>
		</div>
	);
};

export default Workspaces;
