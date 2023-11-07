import React from 'react';

const HeaderBlock = ({ label, type, toggleBlock }) => {
	return (
		<div className="py-4 px-0 flex items-center justify-between cursor-pointer">
			<h3 className="pl-6 text-xl">{label}</h3>
			<button
				className="transition-transform ease-in-out duration-300 bg-transparent text-black select-none hover:bg-transparent mr-6"
				onClick={() => toggleBlock({ type })}>
				▶
			</button>
		</div>
	);
};

export default HeaderBlock;
