import React, { useState } from 'react';

const ModalTask = ({ closeModal, modalRef, task }) => {
	const [editState, setEditState] = useState({
		isEditing: false,
		hasEdited: false,
	});
	const [editedTask, setEditedTask] = useState({
		title: false,
		status: false,
		priority: false,
		deadline: false,
		description: false,
		comments: false,
		workspace: false,
		assignedTo: false,
	});

	const handleEditElement = (e, field) => {
		e.stopPropagation();
		setEditedTask({
			editedTask,
			[field]: !editedTask[field],
		});
	};

	return (
		<section className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10">
			<div className="task-modal" ref={modalRef}>
				<span className="task-modal-close" onClick={closeModal}>
					&times;
				</span>
				<div className="task-details">
					<div className="title-icon relative">
						{!editedTask.title && (
							<h2 className="pt-2 text-2xl font-bold">
								{task.title}
							</h2>
						)}
						{editedTask.title && (
							<>
								<input
									type="text"
									className="task-edit-title pt-2 text-2xl"
									defaultValue={task.title}
								/>
								<button className="save-title absolute right-20">
									Valider
								</button>
								<button
									className="absolute right-0"
									onClick={(e) =>
										handleEditElement(e, 'title')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.title && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'title')
								}></span>
						)}
					</div>

					<div className="status-icon element-icon">
						<span>{task.status}</span>
						{editedTask.status && (
							<>
								<select className="task-edit-select">
									<option value="Pending">À faire</option>
									<option value="In Progress">
										En cours
									</option>
									<option value="Completed">Terminé</option>
									<option value="Archived">Archivé</option>
								</select>
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'status')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.status && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'status')
								}></span>
						)}
					</div>

					<div className="priority-icon element-icon">
						<span>{task.priority}</span>
						{editedTask.priority && (
							<>
								<select className="task-edit-select">
									<option value="Low">Faible</option>
									<option value="Medium">Moyenne</option>
									<option value="High">Haute</option>
									<option value="Urgent">Urgent</option>
								</select>
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'priority')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.priority && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'priority')
								}></span>
						)}
					</div>

					<div className="deadline-icon element-icon">
						<span>{task.deadline}</span>
						{editedTask.deadline && (
							<>
								<input type="date" class="task-edit-date" />
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'deadline')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.deadline && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'deadline')
								}></span>
						)}
					</div>

					<div className="description-icon element-icon">
						<span>{task.description}</span>
						{editedTask.description && (
							<>
								<textarea class="task-edit-description"></textarea>
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'description')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.description && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'description')
								}></span>
						)}
					</div>

					{editedTask.comments && (
						<div className="comments-icon element-icon">
							<span>{task.comments}</span>
							{editedTask.comments && (
								<>
									<textarea class="task-edit-comments"></textarea>
									<button>Valider</button>
									<button
										onClick={(e) =>
											handleEditElement(e, 'comments')
										}>
										Annuler
									</button>
								</>
							)}
							{!editedTask.comments && (
								<span
									className="edit-icon"
									onClick={(e) =>
										handleEditElement(e, 'comments')
									}></span>
							)}
						</div>
					)}

					<div className="workspace-icon element-icon">
						<span>{task.workspace}</span>
						{editedTask.workspace && (
							<>
								<select className="task-edit-select"></select>
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'workspace')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.workspace && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'workspace')
								}></span>
						)}
					</div>

					<div className="assigned-icon element-icon">
						<span>{task.assignedTo}</span>
						{editedTask.assignedTo && (
							<>
								<select className="task-edit-select"></select>
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'assignedTo')
									}>
									Annuler
								</button>
							</>
						)}
						{!editedTask.assignedTo && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'assignedTo')
								}></span>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ModalTask;
