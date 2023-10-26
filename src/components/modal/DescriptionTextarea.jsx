import React from 'react';

const DescriptionTextarea = ({ taskDescription, setTaskDescription }) => {
	return (
		<div className="w-1/2 pl-2 flex flex-col justify-between flex-grow">
			<textarea
				value={taskDescription}
				onChange={(e) => setTaskDescription(e.target.value)}
				name="description"
				className="w-full p-2 resize-none flex-grow block appearance-none bg-white border border-gray-300 hover:border-gray-500 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
				placeholder="Description de la tâche"
				cols="30"
				rows="5"></textarea>
		</div>
	);
};

export default DescriptionTextarea;
