import React from 'react';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';

const Header = () => {
	return (
		<header className="py-O px-[2%] mx-auto relative h-[70px] w-[95%]">
			<HeaderWelcome />
			<HeaderNav />
		</header>
	);
};

export default Header;
