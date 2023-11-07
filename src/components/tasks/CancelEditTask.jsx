import React from 'react';

const CancelEditTask = ({ handleCancelEdit }) => {
	return (
		<button
			onClick={() => handleCancelEdit()}
			className="button bg-red-error hover:bg-red-error-2 mt-2 text-base px-3">
			<i className="fas fa-times mr-2"></i>
			Annuler
		</button>
	);
};

export default CancelEditTask;
