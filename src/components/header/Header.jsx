import React from 'react';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderAvatar from './HeaderAvatar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';

const Header = () => {
	const currentUser = useSelector(selectCurrentUser);

	return (
		<header className="mx-auto relative h-[70px] w-[95%]">
			<HeaderWelcome currentUser={currentUser} />
			<HeaderNav />
			<div className="flex items-center absolute right-0 top-2.5">
				{/* <HeaderSearch /> */}
				<HeaderAvatar currentUser={currentUser} />
			</div>
		</header>
	);
};

export default Header;
