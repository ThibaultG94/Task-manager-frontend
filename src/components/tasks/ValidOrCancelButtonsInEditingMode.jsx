import React from 'react';

const ValidOrCancelButtonsInEditingMode = ({
	handleValidElement,
	handleEditElement,
}) => {
	return (
		<div className="flex items-center">
			<button
				className="bg-[#00C782] rounded text-white p-1 mr-2"
				onClick={(e) => handleValidElement(e)}>
				Valider
			</button>
			<button
				className="bg-red-error rounded text-white p-1"
				onClick={(e) => handleEditElement(e)}>
				Annuler
			</button>
		</div>
	);
};

export default ValidOrCancelButtonsInEditingMode;
