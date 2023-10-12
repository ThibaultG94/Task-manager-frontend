import React from 'react';
import { useEditTask } from '../../api/editTask';
import { useDispatch, useSelector } from 'react-redux';
import { resetEditState } from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';

const SaveEditedTask = ({ taskId, closeModal }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const editedTask = useSelector(selectEditedTask);

	const handleSave = async () => {
		try {
			await editTask(editedTask, taskId);
			dispatch(resetEditState());
			setTimeout(() => {
				closeModal();
			}, 1000);
			console.log(editedTask);
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
