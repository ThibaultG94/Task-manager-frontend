import React from 'react';

const HeaderBlock = ({ label, type, toggleBlock }) => {
	return (
		<div className="task-block-header">
			<h3 className="pl-6 text-xl">{label}</h3>
			<button
				className="toggle-button mr-6"
				onClick={() => toggleBlock({ type })}>
				▶
			</button>
		</div>
	);
};

export default HeaderBlock;
