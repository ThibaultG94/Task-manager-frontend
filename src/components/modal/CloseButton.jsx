const CloseButton = ({ onClose, modalTabs }) => {
	return (
		<span
			aria-label="Close"
			className={
				`cursor-pointer duration-300 hover:rotate-180 transition-transform` +
				(modalTabs
					? ` mr-2`
					: ` absolute top-1 right-1 md:top-2 md:right-2`)
			}
			onClick={onClose}>
			<svg
				className="w-6 h-6 md:w-8 md:h-8"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<line
					x1="10"
					y1="10"
					x2="30"
					y2="30"
					stroke="currentColor"
					strokeWidth="3"
				/>
				<line
					x1="30"
					y1="10"
					x2="10"
					y2="30"
					stroke="currentColor"
					strokeWidth="3"
				/>
			</svg>
		</span>
	);
};

export default CloseButton;
