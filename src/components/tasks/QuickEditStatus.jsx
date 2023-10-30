import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	resetEditState,
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import { useEditTask } from '../../api/editTask';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';
import { toast } from 'react-toastify';

const QuickEditStatus = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputStatusRef = useRef(null);

	const handleSubmitStatus = async (status) => {
		const newStatus = status;
		dispatch(setEditedTask({ status: newStatus }));
		try {
			await editTask({ ...editedTask, status: newStatus });
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			toast.success(
				'Le titre de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour du titre de la tâche.');
		}
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(
					setEditingField({
						field: 'status',
						value: !isEditingField.status,
					})
				);
			}}
			className={
				`text-left mx-auto p-1.5 rounded-lg relative z-10 cursor-auto w-[100px] text-center ` +
				task.convertedStatus
			}>
			{!isEditingField.status && <span>{task.convertedStatus}</span>}
			{isEditingField.status && editedTask?._id === task.taskId ? (
				<form>
					<select
						className="p-0 w-full border-none"
						defaultValue={editedTask?.status}
						ref={inputStatusRef}
						onChange={(e) => handleSubmitStatus(e.target.value)}
						onDoubleClick={() => {
							dispatch(
								setEditingField({
									field: 'status',
									value: !isEditingField.status,
								})
							);
						}}>
						<option value="Pending">À faire</option>
						<option value="In Progress">En cours</option>
						<option value="Completed">Terminé</option>
						<option value="Archived">Archivé</option>
					</select>
				</form>
			) : (
				isEditingField.status && <span>{task.convertedStatus}</span>
			)}
		</div>
	);
};

export default QuickEditStatus;
