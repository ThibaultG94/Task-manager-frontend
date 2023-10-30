import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditTask } from '../../api/editTask';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import {
	resetEditState,
	setEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { toast } from 'react-toastify';

const QuickEditPriority = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputPriorityRef = useRef(null);

	const handleSubmitPriority = async (priority) => {
		const newPriority = priority;
		dispatch(setEditedTask({ priority: newPriority }));
		try {
			await editTask({ ...editedTask, priority: newPriority });
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			toast.success(
				'La priorité de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour de la priorité de la tâche.');
		}
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(
					setEditingField({
						field: 'priority',
						value: !isEditingField.priority,
					})
				);
			}}
			className={
				`text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto ` +
				task.convertedPriority
			}>
			{!isEditingField.priority && <span>{task.convertedPriority}</span>}
			{isEditingField.priority && editedTask?._id === task.taskId ? (
				<form>
					<select
						className="p-0 w-full border-none"
						defaultValue={editedTask?.priority}
						ref={inputPriorityRef}
						onChange={(e) => handleSubmitPriority(e.target.value)}
						onDoubleClick={() => {
							dispatch(
								setEditingField({
									field: 'priority',
									value: !isEditingField.priority,
								})
							);
						}}>
						<option value="Low">Faible</option>
						<option value="Medium">Moyenne</option>
						<option value="High">Haute</option>
						<option value="Urgent">Urgent</option>
					</select>
				</form>
			) : (
				isEditingField.priority && <span>{task.convertedPriority}</span>
			)}
		</div>
	);
};

export default QuickEditPriority;
