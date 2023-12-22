import React from 'react';

const ButtonToEditTaskInModal = ({ openModal, setSelectedTask, task }) => {
	return (
		<div
			onClick={(e) => {
				openModal(e);
				setSelectedTask(task);
			}}
			className="cursor-pointer flex items-center mx-auto">
			<span className="duration-300 ease-in-out search-icon flex items-center p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded transition-colors hover:bg-[#007bff] hover:text-white"></span>
		</div>
	);
};

export default ButtonToEditTaskInModal;
