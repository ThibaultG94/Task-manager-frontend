import React, { useRef } from 'react';
import AvatarUploader from '../Cloudinary/AvatarUploader';

const HeaderAvatar = ({ currentUser }) => {
	const inputFileRef = useRef(null);

	const handleDoubleClick = () => {
		inputFileRef.current.click();
	};

	return (
		<div className="bg-dark-blue-2 flex h-9 sm:h-10 md:h-11 lg:h-12 items-center justify-center mt-2 md:mt-0 overflow-hidden rounded-full solid hover:shadow-sm w-9 sm:w-10 md:w-11 lg:w-12" onDoubleClick={handleDoubleClick}>
			<AvatarUploader user={currentUser} inputFileRef={inputFileRef} />
		</div>
	);
};

export default HeaderAvatar;
