import React, { useEffect, useRef } from 'react';
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
import ArrowDown from '../modal/ArrowDown';
import TaskPriorityDisplay from './utils/TaskPriorityDisplay';

const QuickEditPriority = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputPriorityRef = useRef(null);

	const handleClickOutside = (event) => {
		if (
			inputPriorityRef.current &&
			!inputPriorityRef.current.contains(event.target)
		) {
			dispatch(setEditingField({ field: 'priority', value: false }));
		}
	};

	useEffect(() => {
		if (isEditingField.priority) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isEditingField.priority, dispatch]);

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
				`cursor-auto flex items-center mx-auto p-1.5 px-2 lg:px-2.5 relative rounded-lg ` +
				task.convertedPriority
			}>
			{!isEditingField.priority && (
				<TaskPriorityDisplay
					priority={task.priority}
					convertedPriority={task.convertedPriority}
				/>
			)}
			{isEditingField.priority && editedTask?._id === task.taskId ? (
				<>
					<form className="md:block hidden">
						<select
							className="block bg-transparent appearance-none w-full text-center p-0 pl-2 pr-6 rounded border-0 cursor-pointer"
							defaultValue={editedTask?.priority}
							ref={inputPriorityRef}
							onChange={(e) =>
								handleSubmitPriority(e.target.value)
							}
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
						<ArrowDown />
					</form>
					<TaskPriorityDisplay
						priority={task.priority}
						convertedPriority={task.convertedPriority}
					/>
				</>
			) : (
				isEditingField.priority && (
					<TaskPriorityDisplay
						priority={task.priority}
						convertedPriority={task.convertedPriority}
					/>
				)
			)}
		</div>
	);
};

export default QuickEditPriority;
