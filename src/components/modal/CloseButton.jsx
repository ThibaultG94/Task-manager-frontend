const CloseButton = ({ onClose, modalTabs }) => {
	return (
		<span
			aria-label="Close"
			className={
				`cursor-pointer duration-300 hover:rotate-180 transition-transform` +
				(modalTabs
					? ` mr-2`
					: ` absolute top-1 right-2 md:top-3 md:right-3`)
			}
			onClick={onClose}>
			<svg
				className="w-8 h-8 md:w-10 md:h-10"
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
