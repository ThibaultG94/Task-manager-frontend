import React from 'react';

const CancelEditWorkspace = ({ handleCancelEditWorkspace }) => {
	return (
		<button
			onClick={() => handleCancelEditWorkspace()}
			className="button bg-red-error hover:bg-red-error-2 mt-2 px-3">
			<i className="fas fa-times mr-2"></i>
			Annuler
		</button>
	);
};

export default CancelEditWorkspace;
