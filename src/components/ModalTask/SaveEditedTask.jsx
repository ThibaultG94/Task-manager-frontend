import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';

const SaveEditedTask = ({ setIsEditing, setIsModalOpen, taskData }) => {
	const dispatch = useDispatch();

	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	
	const [editedTask, setEditedTask] = useState(null);

	useEffect(() => {
		setEditedTask({
			_id: taskData._id,
			title: taskData.title,
			status: taskData.status,
			priority: taskData.priority,
			deadline: taskData.deadline,
			description: taskData.description,
			workspaceId: taskData.selectedWorkspace,
			assignedTo: taskData.selectedMember,
			category: taskData.category,
		});
	}, [taskData]);

	const updateTask = async () => {
		try {
			await editTask(editedTask);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
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
