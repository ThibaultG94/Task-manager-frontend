import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	resetEditState,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import { useEditTask } from '../../api/tasks/editTask';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';
import ArrowDown from '../ModalForm/ArrowDown';
import TaskStatusDisplay from './utils/TaskStatusDisplay';
import CloseField from './utils/CloseField';

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
		if (newStatus !== task.status) {
			try {
				await editTask({ ...editedTask, status: newStatus });
				dispatch(resetEditState());
				dispatch(setHasEdited(false));
				await tasksHasBeenUpdated(editedTask, editedTask.category);
				toast.success(
					'Le status de la tâche a été mise à jour avec succès !'
				);
			} catch (error) {
				toast.error('Échec de la mise à jour du status de la tâche.');
			}
		}
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(setExclusiveEditingField('status'));
			}}
			className={
				`cursor-auto flex h-10 items-center m-auto px-2 sm:px-3 md:px-4 p-1.5 rounded-lg relative select-none text-base md:text-sm lg:text-base ` +
				task.convertedStatus
			}>
			{!isEditingField.status && (
				<TaskStatusDisplay
					status={task.status}
					convertedStatus={task.convertedStatus}
				/>
			)}

			{isEditingField.status && editedTask?._id === task.taskId ? (
				<>
					<form className="md:block hidden">
						<select
							className="block bg-transparent appearance-none w-full text-center p-0 pr-2 rounded border-0 cursor-pointer"
							defaultValue={editedTask?.status}
							ref={inputStatusRef}
							onChange={(e) =>
								handleSubmitStatus(e.target.value)
							}>
							<option value="Pending">À faire</option>
							<option value="In Progress">En cours</option>
							<option value="Completed">Terminé</option>
							<option value="Archived">Archivé</option>
						</select>
						<ArrowDown />
						<CloseField selectedField="status" />
					</form>
					<TaskStatusDisplay
						className="block md:hidden"
						convertedStatus={task.convertedStatus}
						status={task.status}
					/>
				</>
			) : (
				isEditingField.status && (
					<TaskStatusDisplay
						status={task.status}
						convertedStatus={task.convertedStatus}
					/>
				)
			)}
		</div>
	);
};

export default QuickEditStatus;
