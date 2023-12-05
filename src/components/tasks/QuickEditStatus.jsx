import React, { useEffect, useRef } from 'react';
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
import ArrowDown from '../modal/ArrowDown';

const QuickEditStatus = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputStatusRef = useRef(null);

	const handleClickOutside = (event) => {
		if (
			inputStatusRef.current &&
			!inputStatusRef.current.contains(event.target)
		) {
			dispatch(setEditingField({ field: 'status', value: false }));
		}
	};

	useEffect(() => {
		if (isEditingField.status) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isEditingField.status, dispatch]);

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
				dispatch(
					setEditingField({
						field: 'status',
						value: !isEditingField.status,
					})
				);
			}}
			className={
				`cursor-auto mx-auto p-1.5 md:p-1 lg:p-1.5 rounded-lg relative text-base md:text-sm lg:text-base ` +
				task.convertedStatus
			}>
			{!isEditingField.status && (
				<span>
					{task.status === 'Archived' ? (
						<>
							<i className="fas fa-archive md:hidden"></i>
							<span className="hidden md:inline">
								{task.convertedStatus}
							</span>
						</>
					) : task.status === 'Completed' ? (
						<>
							<i className="fas fa-check md:hidden"></i>
							<span className="hidden md:inline">
								{task.convertedStatus}
							</span>
						</>
					) : task.status === 'In Progress' ? (
						<>
							<i className="fas fa-spinner md:hidden"></i>
							<span className="hidden md:inline">
								{task.convertedStatus}
							</span>
						</>
					) : task.status === 'Pending' ? (
						<>
							<i className="fas fa-list md:hidden"></i>
							<span className="hidden md:inline">
								{task.convertedStatus}
							</span>
						</>
					) : (
						<span>{task.convertedStatus}</span>
					)}
				</span>
			)}

			{isEditingField.status && editedTask?._id === task.taskId ? (
				<form>
					<select
						className="block bg-transparent appearance-none w-full text-center p-0 pr-2 rounded border-0 cursor-pointer"
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
					<ArrowDown />
				</form>
			) : (
				isEditingField.status && <span>{task.convertedStatus}</span>
			)}
		</div>
	);
};

export default QuickEditStatus;
