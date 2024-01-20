import React from 'react';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderAvatar from './HeaderAvatar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';
import HeaderNotifications from './HeaderNotifications';

const Header = () => {
	const currentUser = useSelector(selectCurrentUser);

	return (
		<header className="h-10 md:h-16 mx-auto py-2 relative w-full">
			<HeaderWelcome currentUser={currentUser} />
			<HeaderNav />
			<div className="absolute flex h-full items-center right-0 top-0">
				{/* <HeaderSearch /> */}
				<div className="flex">
					<HeaderNotifications />
					<HeaderAvatar currentUser={currentUser} />
				</div>
			</div>
		</header>
	);
};

export default Header;
