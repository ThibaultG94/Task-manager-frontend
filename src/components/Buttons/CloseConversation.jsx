const CloseConversation = ({ onClose }) => {
	return (
		<span
			aria-label="Close"
			className={
				`cursor-pointer duration-300 hover:scale-110 transition-transform`
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

export default CloseConversation;
