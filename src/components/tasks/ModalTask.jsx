import React, { useState } from 'react';
import EditTitle from './EditTitle';
import EditStatus from './EditStatus';
import EditPriority from './EditPriority';
import EditDeadline from './EditDeadline';
import EditDescription from './EditDescription';
import EditComments from './EditComments';
import EditWorkspace from './EditWorkspace';
import EditAssignedTo from './EditAssignedTo';

const ModalTask = ({ closeModal, modalRef, task }) => {
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

	const updateEditedPriority = (newPriority) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			priority: newPriority,
		}));
	};

	const updateEditedDeadline = (newDeadline) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			deadline: newDeadline,
		}));
	};

	const updateEditedDescription = (newDescription) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			description: newDescription,
		}));
	};

	const updateEditedComments = (newComments) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			comments: newComments,
		}));
	};

	const updateEditedWorkspace = (newWorkspace) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			workspace: newWorkspace,
		}));
	};

	const updateEditedAssignedTo = (newAssignedTo) => {
		setEditedTask((prevTask) => ({
			...prevTask,
			assignedTo: newAssignedTo,
		}));
	};

	return (
		<section
			className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-10"
			onClick={closeModal}>
			<div
				className="task-modal z-100"
				ref={modalRef}
				onClick={(e) => e.stopPropagation()}>
				<span className="task-modal-close" onClick={closeModal}>
					&times;
				</span>
				<div className="task-details">
					<EditTitle
						editedTitle={editedTask.title}
						setEditedTitle={updateEditedTitle}
					/>

					<EditStatus
						editedStatus={editedTask.status}
						setEditedStatus={updateEditedStatus}
					/>

					<EditPriority
						editedPriority={editedTask.priority}
						setEditedPriority={updateEditedPriority}
					/>

					<EditDeadline
						editedDeadline={editedTask.deadline}
						setEditedDeadline={updateEditedDeadline}
					/>

					<EditDescription
						editedDescription={editedTask.description}
						setEditedDescription={updateEditedDescription}
					/>

					{/* <EditComments
						editedComments={editedTask.comments}
						setEditedComments={updateEditedComments}
					/> */}

					<EditWorkspace
						editedWorkspace={editedTask.workspace}
						setEditedWorkspace={updateEditedWorkspace}
					/>

					<EditAssignedTo
						editedMember={
							editedTask.assignedTo.length < 2
								? editedTask.assignedTo[0]
								: editedTask.assignedTo
						}
						setEditedMember={updateEditedAssignedTo}
						editedWorkspace={editedTask.workspace}
					/>
				</div>
				<div className="action-buttons">
					<button className="delete-button">
						<i className="fas fa-trash-alt"></i> Supprimer
					</button>
					<button className="save-button">
						<i className="fas fa-save"></i> Sauvegarder
					</button>
				</div>
			</div>
		</section>
	);
};

export default ModalTask;
