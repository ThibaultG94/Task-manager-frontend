import React, { useState, useEffect } from 'react';

const HeaderAvatar = ({ currentUser, notifications }) => {
	const [hasNewNotification, setHasNewNotification] = useState(false);

	useEffect(() => {
		if (notifications && notifications.length > 0) {
			setHasNewNotification(true);
		}
	}, [notifications]);

	const firstLetter = currentUser?.username[0];

	return (
		<div className="flex">
			<div className="flex relative mr-4 h-8 sm:h-10 md:h-12 mt-2 md:mt-0 items-center justify-center">
				<span className="text-dark-blue text-xl sm:text-2xl md:text-3xl">
					<i className="fa-regular fa-bell"></i>
				</span>
				{hasNewNotification && (
					<span className="absolute top-4 sm:top-3.5 right-0 h-2 sm:h-2.5 md:h-3 w-2 sm:w-2.5 md:w-3 bg-red-500 rounded-full"></span>
				)}
			</div>
			<div className="bg-dark-blue flex h-8 sm:h-10 md:h-12 items-center justify-center mt-2 md:mt-0 overflow-hidden rounded-full w-8 sm:w-10 md:w-12">
				<span
					id="avatarLetter"
					className="text-light-blue text-2xl sm:text-3xl md:text-4xl">
					{firstLetter}
				</span>
			</div>
		</div>
	);
};

export default HeaderAvatar;
