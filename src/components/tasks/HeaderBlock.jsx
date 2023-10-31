import React from 'react';

const HeaderBlock = ({ label, type, toggleBlock }) => {
	return (
		<div className="task-block-header">
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
