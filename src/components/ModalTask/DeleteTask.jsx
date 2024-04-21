import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useDeleteTask } from '../../api/tasks/useDeleteTask';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';

const DeleteTask = ({ setIsModalOpen }) => {
	const dispatch = useDispatch();
	const editedTask = useSelector(selectEditedTask);

	const deleteTask = useDeleteTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();

	const removeTask = async () => {
		try {
			await deleteTask(editedTask._id);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			toast.success('La tâche a été supprimée avec succès !');
		} catch (error) {
			toast.error('Échec de la suppression de la tâche.');
			return;
		}
	};

	const handleDelete = async () => {
		const confirmation = window.confirm(
			'Etes-vous sûr de vouloir supprimer cette tâche ?'
		);

		if (confirmation) {
			await removeTask();
			setIsModalOpen(false);
		}
	};

	return (
		<button
			className="text-base hover:text-red-error-2 px-4 py-2 rounded-md absolute top-1 left-0"
			onClick={handleDelete}>
			<i className="fas fa-trash-alt"></i>
		</button>
	);
};

export default DeleteTask;
