import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import Footer from './Footer';

const SideBar = ({ userId }) => {
	return (
		<div className="flex flex-row xl:flex-col h-16 xl:h-screen p-2 px-4 xl:py-2.5 w-screen xl:w-20">
			<Logo />
			<div className="flex flex-row xl:flex-col xl:h-full items-center justify-between pl-20 xl:pl-0 xl:mt-14 xl:px-auto w-full">
				<Navigation userId={userId} />
				<Footer />
			</div>
		</div>
	);
};

export default SideBar;
