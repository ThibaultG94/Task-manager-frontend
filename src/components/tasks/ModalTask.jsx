import React, { useState } from 'react';

const ModalTask = ({ closeModal, modalRef, task }) => {
	const [editState, setEditState] = useState({
		isEditing: false,
		hasEdited: false,
	});
	const [editedTask, setEditedTask] = useState({});

	return (
		<section className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10">
			<div className="task-modal" ref={modalRef}>
				<span class="task-modal-close" onClick={closeModal}>
					&times;
				</span>
				<div className="task-details">
					<h2>{task.title}</h2>
					<input
						type="text"
						style={{ display: 'none' }}
						class="task-edit-title"
					/>
				</div>
			</div>
		</section>
	);
};

export default ModalTask;
