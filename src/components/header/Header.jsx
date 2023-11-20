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
		<header className="flex justify-between mx-auto py-2 w-full">
			<HeaderWelcome currentUser={currentUser} />
			<HeaderNav />
			<div className="flex items-center">
				{/* <HeaderSearch /> */}
				<HeaderAvatar currentUser={currentUser} />
			</div>
		</header>
	);
};

export default Header;
