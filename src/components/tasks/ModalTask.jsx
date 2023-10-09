import React, { useState } from 'react';

const ModalTask = ({ task }) => {
	const [editState, setEditState] = useState({
		isEditing: false,
		hasEdited: false,
	});
	const [editedTask, setEditedTask] = useState({});

	return (
		<section className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10">
			<div className="task-modal">
				<h2>Task</h2>
			</div>
		</section>
	);
};

export default ModalTask;
