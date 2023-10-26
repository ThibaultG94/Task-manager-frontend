import React from 'react';

const TitleInput = ({ taskTitle, setTaskTitle }) => {
	return (
		<div className="mb-5">
			<input
				value={taskTitle}
				onChange={(e) => setTaskTitle(e.target.value)}
				type="text"
				name="taskTitle"
				placeholder="Nom de la tâche"
				required
				className="placeholder-gray-500 w-full p-2 border border-gray-300 rounded"
			/>
		</div>
	);
};

export default TitleInput;
