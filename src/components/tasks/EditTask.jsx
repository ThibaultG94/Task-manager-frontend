import React from 'react';

const EditTask = ({ handleEditTask }) => {
	return (
		<>
			<button
				className="button bg-light-blue-2 hover:bg-dark-blue mr-8"
				onClick={handleEditTask}>
				<i className="fas fa-pencil-alt mr-2"></i> Editer
			</button>
		</>
	);
};

export default EditTask;
