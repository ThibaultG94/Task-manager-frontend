import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteTask } from '../../api/deleteTask';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import {
	resetEditState,
	setHasBeenSaved,
	setHasEdited,
} from '../../store/feature/editState.slice';

const DeleteTask = ({ setIsModalOpen, setDeleteMessage }) => {
	const dispatch = useDispatch();
	const deleteTask = useDeleteTask();
	const editedTask = useSelector(selectEditedTask);

	const removeTask = async () => {
		try {
			await deleteTask(editedTask._id);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			dispatch(setHasBeenSaved(true));
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
		<button className="delete-button" onClick={handleDelete}>
			<i className="fas fa-trash-alt"></i> Supprimer
		</button>
	);
};

export default DeleteTask;
