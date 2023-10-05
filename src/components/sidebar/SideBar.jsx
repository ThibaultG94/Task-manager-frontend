import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import Footer from './Footer';

const SideBar = () => {
	return (
		<div className="grid grid-rows-[1fr,4fr,5fr] h-screen p-[20px] w-[90px]">
			<Logo />
			<Navigation />
			<Footer />
		</div>
	);
};

export default SideBar;
