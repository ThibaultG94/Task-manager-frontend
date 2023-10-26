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
				className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 p-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
			/>
		</div>
	);
};

export default TitleInput;
