import React, { useEffect, useState } from 'react';
import { useEditTask } from '../../api/editTask';
import { useDispatch } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';
import { toast } from 'react-toastify';

const SaveEditedTask = ({ setIsModalOpen, taskData }) => {
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
		await updateTask();
		setTimeout(() => {
			setIsModalOpen(false);
		}, 500);
	};

	return (
		<button
			className="button mt-2 bg-light-blue-2 hover:bg-dark-blue"
			onClick={handleSave}>
			<i className="fas fa-save"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedTask;
