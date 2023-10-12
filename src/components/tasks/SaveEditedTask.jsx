import React from 'react';
import { useEditTask } from '../../api/editTask';
import { useDispatch } from 'react-redux';
import { resetEditState } from '../../store/feature/editState.slice';

const SaveEditedTask = ({ editedTask, taskId, closeModal }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();

	const handleSave = async () => {
		try {
			await editTask(editedTask, taskId);
		} catch (error) {
			console.error('Échec de la mise à jour de la tâche:', error);
			return;
		}

		dispatch(resetEditState());
		closeModal();
	};

	return (
		<button className="save-button" onClick={handleSave}>
			<i className="fas fa-save"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedTask;
