import React from 'react';
import { useEditTask } from '../../api/editTask';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetEditState,
	setHasBeenSaved,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { selectHasEdited } from '../../store/selectors/editStateSelectors';

const SaveEditedTask = ({ setIsModalOpen }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const editedTask = useSelector(selectEditedTask);
	const hasEdited = useSelector(selectHasEdited);

	const updateTask = async () => {
		try {
			await editTask(editedTask);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			dispatch(setHasBeenSaved(true));
		} catch (error) {
			console.error('Échec de la mise à jour de la tâche:', error);
			return;
		}
	};

	const handleSave = async () => {
		if (hasEdited) await updateTask();
		setTimeout(() => {
			// closeModal();
			setIsModalOpen(false);
		}, 1000);
	};

	return (
		<button className="save-button" onClick={handleSave}>
			<i className="fas fa-save"></i> Sauvegarder
		</button>
	);
};

export default SaveEditedTask;
