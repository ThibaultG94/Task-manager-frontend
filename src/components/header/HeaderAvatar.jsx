import React from 'react';

const HeaderAvatar = ({ currentUser }) => {
	const firstLetter = currentUser?.username[0];

	return (
		<div className="bg-dark-blue flex h-8 sm:h-10 md:h-12 items-center justify-center mt-2 md:mt-0 overflow-hidden rounded-full w-8 sm:w-10 md:w-12">
			<span
				id="avatarLetter"
				className="text-light-blue text-2xl sm:text-3xl md:text-4xl">
				{firstLetter}
			</span>
		</div>
	);
};

export default HeaderAvatar;
