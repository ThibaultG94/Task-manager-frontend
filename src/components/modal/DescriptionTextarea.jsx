import React from 'react';

const DescriptionTextarea = ({ taskDescription, setTaskDescription }) => {
	return (
		<div className="w-1/2 pl-2 flex flex-col justify-between flex-grow">
			<textarea
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
				name="description"
				className="w-full p-2 border border-gray-300 rounded resize-none flex-grow"
				placeholder="Description de la tâche"
				cols="30"
				rows="5"></textarea>
		</div>
	);
};

export default DescriptionTextarea;
