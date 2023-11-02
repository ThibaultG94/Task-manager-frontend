import React from 'react';

const CloseButton = ({ onClose, modalTabs }) => {
	return (
		<span
			aria-label="Close"
			className={
				`cursor-pointer transition-transform duration-200 hover:rotate-180` +
				(modalTabs ? ` mr-2` : ` absolute top-0 right-0`)
			}
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
					strokeWidth="2"
				/>
				<line
					x1="30"
					y1="10"
					x2="10"
					y2="30"
					stroke="currentColor"
					strokeWidth="2"
				/>
			</svg>
		</span>
	);
};

export default CloseButton;
