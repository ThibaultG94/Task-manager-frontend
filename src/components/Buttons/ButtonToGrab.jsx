import React, { useState } from 'react';

const ButtonToGrab = () => {
	const [isGrabbing, setIsGrabbing] = useState(false);

	return (
		<div
			className={`flex flex-col items-center mx-auto cursor-${
				isGrabbing ? 'grabbing' : 'grab'
			} my-auto hover:cursor-grab`}
			onMouseDown={() => setIsGrabbing(true)}
			onMouseUp={() => setIsGrabbing(false)}>
			<div className="w-3 sm:w-4 md:w-5 lg:w-6 xl:w-7 h-0.5 bg-black mb-0.5 sm:mb-1 md:mb-1.5"></div>
			<div className="w-3 sm:w-4 md:w-5 lg:w-6 xl:w-7 h-0.5 bg-black mb-0.5 sm:mb-1 md:mb-1.5"></div>
			<div className="w-3 sm:w-4 md:w-5 lg:w-6 xl:w-7 h-0.5 bg-black"></div>
		</div>
	);
};

export default ButtonToGrab;
