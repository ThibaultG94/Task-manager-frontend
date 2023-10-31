import React, { useState } from 'react';

const ButtonToGrab = () => {
	const [isGrabbing, setIsGrabbing] = useState(false);

	return (
		<div
			className={`mx-auto flex flex-col items-center cursor-${
				isGrabbing ? 'grabbing' : 'grab'
			} my-auto hover:cursor-grab`}
			onMouseDown={() => setIsGrabbing(true)}
			onMouseUp={() => setIsGrabbing(false)}>
			<div className="w-7 h-0.5 bg-black mb-1.5"></div>
			<div className="w-7 h-0.5 bg-black mb-1.5"></div>
			<div className="w-7 h-0.5 bg-black"></div>
		</div>
	);
};

export default ButtonToGrab;
