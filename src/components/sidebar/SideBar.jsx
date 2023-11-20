import React from 'react';
import Logo from './Logo';
import Navigation from './Navigation';
import Footer from './Footer';

const SideBar = ({ userId }) => {
	return (
		<div className="flex flex-col h-screen p-[20px] w-[90px]">
			<Logo />
			<div className="flex flex-col h-full items-center justify-between mt-14 px-auto w-full">
				<div className="flex justify-center w-full">
					<Navigation userId={userId} />
				</div>
				<div className="flex justify-center w-full">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
