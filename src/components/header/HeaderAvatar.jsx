import React from 'react';

const HeaderAvatar = ({ currentUser }) => {
	const firstLetter = currentUser?.username[0];

	return (
		<div>
			<div className="rounded-full bg-[#171f39] h-12 w-12 overflow-hidden flex items-center justify-center">
				<span id="avatarLetter" className="text-[#eaefff] text-4xl">
					{firstLetter}
				</span>
			</div>
		</div>
	);
};

export default HeaderAvatar;
