import React from 'react';

const ButtonToEditTaskInModal = ({ openModal, setSelectedTask, task }) => {
	return (
		<div
			onClick={(e) => {
				openModal(e);
				setSelectedTask(task);
			}}
			className="mx-auto flex items-center cursor-pointer">
			Edit
		</div>
	);
};

export default ButtonToEditTaskInModal;
