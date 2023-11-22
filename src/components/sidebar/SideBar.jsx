import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import Footer from './Footer';

const SideBar = ({ userId }) => {
	return (
		<div className="flex flex-row md:flex-col h-16 md:h-screen p-2 px-3 md:py-2.5 w-screen md:w-20">
			<Logo />
			<div className="flex flex-row md:flex-col md:h-full items-center justify-between pl-20 md:pl-0 md:mt-14 md:px-auto w-full">
				<Navigation userId={userId} />
				<Footer />
			</div>
		</div>
	);
};

export default SideBar;
