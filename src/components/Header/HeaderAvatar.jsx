import React, { useRef } from 'react';
import AvatarUploader from '../Cloudinary/AvatarUploader';

const HeaderAvatar = ({ currentUser }) => {
	const inputFileRef = useRef(null);

	const handleDoubleClick = () => {
		inputFileRef.current.click();
	};

	return (
		<div className="bg-dark-blue flex h-8 sm:h-10 md:h-12 items-center justify-center mt-2 md:mt-0 overflow-hidden rounded-full solid hover:shadow-sm w-8 sm:w-10 md:w-12" onDoubleClick={handleDoubleClick}>
			<AvatarUploader user={currentUser} inputFileRef={inputFileRef} />
		</div>
	);
};

export default HeaderAvatar;
