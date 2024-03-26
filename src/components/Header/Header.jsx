import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/selectors/userSelectors';
import HeaderWelcome from './HeaderWelcome';
import HeaderNav from './HeaderNav';
import HeaderSearch from './HeaderSearch';
import HeaderNotifications from './HeaderNotifications';
import HeaderAvatar from './HeaderAvatar';

const Header = () => {
	const currentUser = useSelector(selectCurrentUser);
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (currentUser) {
			setUserId(currentUser._id);
		}
	}, [currentUser]);

	return (
		<header className="h-10 md:h-16 mx-auto py-2 relative w-full">
			<HeaderWelcome currentUser={currentUser} />
			<HeaderNav />
			<div className="absolute flex h-full items-center right-0 top-0">
				{/* <HeaderSearch /> */}
				<div className="flex">
					<HeaderNotifications userId={userId} />
					<HeaderAvatar currentUser={currentUser} />
				</div>
			</div>
		</header>
	);
};

export default Header;
