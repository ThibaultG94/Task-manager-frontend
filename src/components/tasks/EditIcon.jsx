import React from 'react';

const EditIcon = ({ handleEditElement }) => {
	return (
		<span
			onClick={(e) => handleEditElement(e)}
			className="flex items-center pl-2.5 pr-1.5 text-sm rounded cursor-pointer transition-colors duration-300 ml-2.5 hover:bg-blue-600 hover:text-white">
			<i className="fas fa-pencil-alt"></i>
		</span>
	);
};

export default EditIcon;
