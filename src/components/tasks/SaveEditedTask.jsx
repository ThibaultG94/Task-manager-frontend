import React from 'react';
import { useEditTask } from '../../api/editTask';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { selectHasEdited } from '../../store/selectors/editStateSelectors';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';

const SaveEditedTask = ({ setIsModalOpen, setSaveMessage }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const editedTask = useSelector(selectEditedTask);
	const hasEdited = useSelector(selectHasEdited);

	const updateTask = async () => {
		try {
			await editTask(editedTask);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
		} catch (error) {
			setSaveMessage('Échec de la mise à jour de la tâche.');
			console.error('Échec de la mise à jour de la tâche:', error);
			return;
		}
	};

	const handleSave = async () => {
		if (hasEdited) await updateTask();
		setSaveMessage('La tâche a été mise à jour avec succès !');
		setTimeout(() => {
			setIsModalOpen(false);
			setSaveMessage('');
		}, 500);
	};

	return (
		<button className="save-button" onClick={handleSave}>
			<i className="fas fa-save"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedTask;
