import React from 'react';
import { useEditTask } from '../../api/editTask';

const SaveEditedTask = ({ editedTask, taskId, closeModal }) => {
	const editTask = useEditTask();

	const handleSave = async () => {
		try {
			await editTask(editedTask, taskId);
			closeModal();
		} catch (error) {
			console.error('Échec de la mise à jour de la tâche:', error);
		}
	};

	return (
		<button className="save-button" onClick={handleSave}>
			<i className="fas fa-save"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedTask;
