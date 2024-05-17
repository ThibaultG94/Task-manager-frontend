import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import getUserId from '../../api/users/getUserId';
import { selectUserContacts } from '../../store/selectors/userSelectors';
import LoadingCreateComponent from '../Buttons/LoadingCreateComponent';

const SaveEditedTask = ({ setIsEditing, taskData, workspaceTask }) => {
	const dispatch = useDispatch();

	const contacts = useSelector(selectUserContacts);

	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();

	const [editedTask, setEditedTask] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let assigned = [];
		taskData.assignedTo.forEach((member) => {
			const contact = contacts.find((contact) => contact.userId === member);
			assigned.push(contact);
		});
		setEditedTask({
			_id: taskData._id,
			title: taskData.title,
			status: taskData.status,
			priority: taskData.priority,
			deadline: taskData.deadline,
			description: taskData.description,
			workspaceId: taskData.selectedWorkspace,
			assignedTo: [...taskData.assignedTo],
			category: taskData.category,
		});
	}, [taskData]);

	const updateTask = async () => {
		try {
			const userId = await getUserId();

			let assigned = [];
			for (const user of editedTask.assignedTo) {
				const member = workspaceTask.members.find(member => member.userId === user.userId);
				if (!member) {
					throw new Error(`Member not found for member: ${user.username}`);
				}
				assigned.push(member.userId);
			}

			const task = {
				_id: editedTask._id,
				title: editedTask.title,
				status: editedTask.status,
				priority: editedTask.priority,
				deadline: editedTask.deadline,
				description: editedTask.description,
				workspaceId: editedTask.workspaceId,
				assignedTo: assigned,
				category: editedTask.category,
				comments: [...editedTask.comments],
			};

			await editTask(task);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(task, editedTask.category);
			await setTaskNotification(task, userId);
			toast.success('La tâche a été mise à jour avec succès !');
		} catch (error) {
			console.error(error);
			toast.error('Échec de la mise à jour de la tâche.');
			return;
		}
	};

	const handleSave = async () => {
		if (editedTask.title === '') {
			toast.error('Veuillez saisir un titre.');
			return;
		}
		setIsLoading(true);
		await updateTask();
		setIsLoading(false);
		// setIsModalOpen(false);
		setIsEditing(false);
	};

	return (
		<div>
			{isLoading ? (
				<LoadingCreateComponent />
			) : (
				<button
				className="button mt-2 bg-light-blue-2 hover:bg-dark-blue"
				onClick={handleSave}>
					<i className="fas fa-save mr-2"></i> Sauvegarder
				</button>
			)}
		</div>
	);
};

export default SaveEditedTask;
