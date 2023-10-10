import React, { useEffect, useRef, useState } from 'react';
import { convertStatus } from '../utils/convertStatus';
import EditTitle from './EditTitle';
import EditStatus from './EditStatus';

const ModalTask = ({ closeModal, modalRef, task }) => {
	const [editState, setEditState] = useState({
		isEditing: false,
		hasEdited: false,
	});
	const [isEditingFields, setIsEditingFields] = useState({
		title: false,
		status: false,
		priority: false,
		deadline: false,
		description: false,
		comments: false,
		workspace: false,
		assignedTo: false,
	});
	const [editedTask, setEditedTask] = useState({
		title: task.title,
		status: task.status,
		priority: task.priority,
		deadline: task.deadline,
		description: task.description,
		comments: task.comments,
		workspace: task.workspace,
		assignedTo: task.assignedTo,
	});

	const inputRefs = useRef([]);

	const handleEditElement = (e, field) => {
		e.stopPropagation();
		setIsEditingFields({
			isEditingFields,
			[field]: !isEditingFields[field],
		});
	};

	const updateEditedTitle = (newTitle) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			title: newTitle,
		}));
	};

	const updateEditedStatus = (newStatus) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			status: newStatus,
		}));
	};

	return (
		<section className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10">
			<div className="task-modal" ref={modalRef}>
				<span className="task-modal-close" onClick={closeModal}>
					&times;
				</span>
				<div className="task-details">
					<EditTitle
						editState={editState}
						setEditState={setEditState}
						editedTitle={editedTask.title}
						setEditedTitle={updateEditedTitle}
						inputRefs={inputRefs}
					/>

					<EditStatus
						editState={editState}
						setEditState={setEditState}
						editedStatus={editedTask.status}
						setEditedStatus={updateEditedStatus}
					/>

					<div className="priority-icon element-icon">
						{!isEditingFields.priority && (
							<span>{task.priority}</span>
						)}
						{isEditingFields.priority && (
							<>
								<select
									className="task-edit-select"
									defaultValue={task.priority}>
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
						{!isEditingFields.priority && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'priority')
								}></span>
						)}
					</div>

					<div className="deadline-icon element-icon">
						{!isEditingFields.deadline && (
							<span>{task.deadline}</span>
						)}
						{isEditingFields.deadline && (
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
						{!isEditingFields.deadline && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'deadline')
								}></span>
						)}
					</div>

					<div className="description-icon element-icon">
						{!isEditingFields.description && (
							<span>{task.description}</span>
						)}
						{isEditingFields.description && (
							<>
								<textarea
									className="task-edit-description"
									ref={(el) => (inputRefs.current[1] = el)}
								/>
								<button>Valider</button>
								<button
									onClick={(e) =>
										handleEditElement(e, 'description')
									}>
									Annuler
								</button>
							</>
						)}
						{!isEditingFields.description && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'description')
								}></span>
						)}
					</div>

					{isEditingFields.comments && (
						<div className="comments-icon element-icon">
							<span>{task.comments}</span>
							{isEditingFields.comments && (
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
							{!isEditingFields.comments && (
								<span
									className="edit-icon"
									onClick={(e) =>
										handleEditElement(e, 'comments')
									}></span>
							)}
						</div>
					)}

					<div className="workspace-icon element-icon">
						{!isEditingFields.workspace && (
							<span>{task.workspace}</span>
						)}
						{isEditingFields.workspace && (
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
						{!isEditingFields.workspace && (
							<span
								className="edit-icon"
								onClick={(e) =>
									handleEditElement(e, 'workspace')
								}></span>
						)}
					</div>

					<div className="assigned-icon element-icon">
						{!isEditingFields.assignedTo && (
							<span>{task.assignedTo}</span>
						)}
						{isEditingFields.assignedTo && (
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
						{!isEditingFields.assignedTo && (
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
