import React from 'react';

const EditIcon = ({ handleEditTask, quickEdit }) => {
	return (
		<span
			onClick={(e) => handleEditTask(e)}
			className={
				'flex items-center pl-2.5 pr-1.5 py-2 rounded cursor-pointer transition-colors duration-300 ml-2.5 hover:bg-blue-600 hover:text-white ' +
				(quickEdit ? 'text-sm' : 'absolute top-2 left-0 text-lg')
			}>
			<i className="fas fa-pencil-alt"></i>
		</span>
	);
};

export default EditIcon;
