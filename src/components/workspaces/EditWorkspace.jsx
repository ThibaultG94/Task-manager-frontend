import React from 'react';

const EditWorkspace = ({ handleEditWorkspace }) => {
	return (
		<>
			<button
				className="button bg-light-blue-2 hover:bg-dark-blue mb-3 mr-8"
				onClick={handleEditWorkspace}>
				<i className="fas fa-pencil-alt mr-2"></i> Editer
			</button>
		</>
	);
};

export default EditWorkspace;
