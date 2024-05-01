import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import {
	resetEditState,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import getUserId from '../../api/users/getUserId';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';
import ArrowDown from '../Buttons/ArrowDown';
import CloseField from '../Buttons/CloseField';
import LoadingEditComponent from '../Buttons/LoadingEditComponent';

const QuickEditPriority = ({ task, setSelectedTask, isPriorityCanBeEdited, isActive, activeStyle }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);

	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();

	const [isLoading, setIsLoading] = useState(false);

	const inputPriorityRef = useRef(null);

	const priorityIcon = {
		Urgent: 'fa-exclamation-triangle',
		Haute: 'fa-arrow-up',
		Moyenne: 'fa-equals',
		Faible: 'fa-arrow-down',
	};

	const handleSubmitPriority = async (priority) => {
		const newPriority = priority;
		dispatch(setEditedTask({ priority: newPriority }));
		try {
			setIsLoading(true);
			const userId = await getUserId();

			let assigned = [];
			for (const member of editedTask.assignedTo) {
				assigned.push(member.userId);
			}

			const task = {
				_id: editedTask._id,
				title: editedTask.title,
				status: editedTask.status,
				priority: newPriority,
				deadline: editedTask.deadline,
				description: editedTask.description,
				workspaceId: editedTask.workspaceId,
				assignedTo: assigned,
				category: editedTask.category,
			};

			await editTask(task);

			dispatch(resetEditState());
			dispatch(setHasEdited(false));

			await tasksHasBeenUpdated(editedTask, editedTask.category);
			await setTaskNotification(editedTask, userId);

			setIsLoading(false);
			toast.success(
				'La priorité de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour de la priorité de la tâche.');
		}
	};

	const editPriority = (task) => {
		setSelectedTask(task);
		if (isPriorityCanBeEdited) dispatch(setExclusiveEditingField('priority'));
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => editPriority(task)}
			className={
				`cursor-auto flex h-10 items-center m-auto p-1.5 px-2 sm:px-3 md:px-4 relative rounded-lg text-base md:text-sm lg:text-base
				${task.convertedPriority} ${isActive ? activeStyle : ''}`
			}>
			{!isEditingField.priority && !isLoading && (
				<span>
					<i className={`fas ${priorityIcon[task.convertedPriority]} block lg:hidden`}></i>
					<span className="ellipsis hidden lg:inline">
						{task.convertedPriority}
					</span>
				</span>
			)}
			{isEditingField.priority && editedTask?._id === task.taskId && !isLoading ? (
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
					<span className="block lg:hidden">
						<i
							className={`fas ${priorityIcon[task.convertedPriority]} block lg:hidden`}></i>
						<span className="ellipsis hidden lg:inline">
							{task.convertedPriority}
						</span>
					</span>
				</>
			) : (
				isEditingField.priority && !isLoading && (
					<span>
						<i className={`fas ${priorityIcon[task.convertedPriority]} block lg:hidden`}></i>
						<span className="ellipsis hidden lg:inline">
							{task.convertedPriority}
						</span>
					</span>
				)
			)}
			{isLoading && (
				<LoadingEditComponent />
			)}
		</div>
	);
};

export default QuickEditPriority;
