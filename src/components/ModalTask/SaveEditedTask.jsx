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

const SaveEditedTask = ({ setIsEditing, setIsModalOpen, taskData }) => {
	const dispatch = useDispatch();

	const contacts = useSelector(selectUserContacts);

	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();

	const [editedTask, setEditedTask] = useState(null);

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

	useEffect(() => {
		console.log(editedTask);
	}, [editedTask]);

	const updateTask = async () => {
		try {
			const userId = await getUserId();

			let assigned = [];
			for (const member of editedTask.assignedTo) {
				const contact = contacts.find(contact => contact.id === member.userId);
				if (!contact) {
					throw new Error(`Contact not found for member: ${member.username}`);
				}
				assigned.push(contact.id);
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
			};

			await editTask(task);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			await setTaskNotification(editedTask, userId);
			toast.success('La tâche a été mise à jour avec succès !');
		} catch (error) {
			toast.error('Échec de la mise à jour de la tâche.');
			return;
		}
	};

	const handleSave = async () => {
		if (editedTask.title === '') {
			toast.error('Veuillez saisir un titre.');
			return;
		}
		await updateTask();
		setIsModalOpen(false);
		setIsEditing(false);
	};

	return (
		<button
			className="button mt-2 bg-light-blue-2 hover:bg-dark-blue"
			onClick={handleSave}>
			<i className="fas fa-save mr-2"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedTask;
