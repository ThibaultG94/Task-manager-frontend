import React from 'react';

const CloseButton = ({ onClose }) => {
	return (
		<span
			aria-label="Close"
			className="cursor-pointer mr-2 transition-transform duration-200 hover:rotate-180"
			onClick={onClose}>
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<line
					x1="10"
					y1="10"
					x2="30"
					y2="30"
					stroke="currentColor"
					stroke-width="2"
				/>
				<line
					x1="30"
					y1="10"
					x2="10"
					y2="30"
					stroke="currentColor"
					stroke-width="2"
				/>
			</svg>
		</span>
	);
};

export default CloseButton;
