import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import {
	resetEditState,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { toast } from 'react-toastify';
import ArrowDown from '../Buttons/ArrowDown';
import TaskPriorityDisplay from './utils/TaskPriorityDisplay';
import CloseField from './utils/CloseField';

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
				dispatch(setExclusiveEditingField('priority'));
			}}
			className={
				`cursor-auto flex h-10 items-center m-auto p-1.5 px-2 sm:px-3 md:px-4 relative rounded-lg text-base md:text-sm lg:text-base ` +
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
					<form className="lg:block hidden">
						<select
							className="block bg-transparent appearance-none w-full text-center p-0 pr-2 rounded border-0 cursor-pointer"
							defaultValue={editedTask?.priority}
							ref={inputPriorityRef}
							onChange={(e) =>
								handleSubmitPriority(e.target.value)
							}>
							<option value="Low">Faible</option>
							<option value="Medium">Moyenne</option>
							<option value="High">Haute</option>
							<option value="Urgent">Urgent</option>
						</select>
						<ArrowDown />
						<CloseField
							left="left-24 lg:left-28"
							selectedField="priority"
						/>
					</form>
					<TaskPriorityDisplay
						className="block lg:hidden"
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
