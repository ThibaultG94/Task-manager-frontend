import React from 'react';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderAvatar from './HeaderAvatar';

const Header = () => {
	return (
		<header className="py-O px-[2%] mx-auto relative h-[70px] w-[95%]">
			<HeaderWelcome />
			<HeaderNav />
			<div className="flex items-center absolute right-0 top-2.5">
				{/* <HeaderSearch /> */}
				<HeaderAvatar />
			</div>
		</header>
	);
};

export default Header;
