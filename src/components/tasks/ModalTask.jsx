import React, { useRef, useState } from 'react';
import EditTitle from './EditTitle';
import EditStatus from './EditStatus';
import EditPriority from './EditPriority';
import EditDeadline from './EditDeadline';
import EditDescription from './EditDescription';
import EditComments from './EditComments';
import EditWorkspace from './EditWorkspace';
import EditAssignedTo from './EditAssignedTo';

const ModalTask = ({ closeModal, modalRef, task }) => {
	const [editState, setEditState] = useState({
		isEditing: false,
		hasEdited: false,
	});
	const [isEditingFields, setIsEditingFields] = useState({
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
					/>

					<EditStatus
						editState={editState}
						setEditState={setEditState}
						editedStatus={editedTask.status}
						setEditedStatus={updateEditedStatus}
					/>

					<EditPriority
						editState={editState}
						setEditState={setEditState}
						editedPriority={editedTask.priority}
						setEditedPriority={updateEditedPriority}
					/>

					<EditDeadline
						editState={editState}
						setEditState={setEditState}
						editedDeadline={editedTask.deadline}
						setEditedDeadline={updateEditedDeadline}
					/>

					<EditDescription
						editState={editState}
						setEditState={setEditState}
						editedDescription={editedTask.description}
						setEditedDescription={updateEditedDescription}
					/>

					{/* <EditComments
						editState={editState}
						setEditState={setEditState}
						editedComments={editedTask.comments}
						setEditedComments={updateEditedComments}
					/> */}

					<EditWorkspace
						editState={editState}
						setEditState={setEditState}
						editedWorkspace={editedTask.workspace}
						setEditedWorkspace={updateEditedWorkspace}
					/>

					<EditAssignedTo
						editState={editState}
						setEditState={setEditState}
						editedMember={
							editedTask.assignedTo.length < 2
								? editedTask.assignedTo[0]
								: editedTask.assignedTo
						}
						setEditedMember={updateEditedAssignedTo}
						editedWorkspace={editedTask.workspace}
					/>
				</div>
			</div>
		</section>
	);
};

export default ModalTask;
