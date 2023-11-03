import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteTask } from '../../api/deleteTask';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';

const DeleteTask = ({ setIsModalOpen, setDeleteMessage }) => {
	const dispatch = useDispatch();
	const deleteTask = useDeleteTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const editedTask = useSelector(selectEditedTask);

	const removeTask = async () => {
		try {
			await deleteTask(editedTask._id);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
		} catch (error) {
			setDeleteMessage('Échec de la suppression de la tâche.');
			console.error('Échec de la suppression de la tâche:', error);
			return;
		}
	};

	const handleDelete = async () => {
		await removeTask();
		setDeleteMessage('La tâche a été supprimée avec succès !');
		setTimeout(() => {
			setIsModalOpen(false);
			setDeleteMessage('');
		}, 500);
	};

	return (
		<button
			className="button bg-red-error hover:bg-red-error-2 mt-2 text-base px-3"
			onClick={handleDelete}>
			<i className="fas fa-trash-alt"></i> Supprimer
		</button>
	);
};

export default DeleteTask;
