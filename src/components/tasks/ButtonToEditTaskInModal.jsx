import React from 'react';

const ButtonToEditTaskInModal = ({ openModal, setSelectedTask, task }) => {
	return (
		<div
			onClick={(e) => {
				openModal(e);
				setSelectedTask(task);
			}}
			className="mx-auto flex items-center cursor-pointer">
			<span className="edit-icon transition-colors duration-300 ease-in-out flex items-center text-center text-sm rounded py-2 px-3 hover:bg-[#007bff] hover:text-white"></span>
		</div>
	);
};

export default ButtonToEditTaskInModal;
