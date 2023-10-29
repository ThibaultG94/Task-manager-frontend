import React, { useCallback, useEffect, useRef, useState } from 'react';
import { inverseDateFormat } from '../utils/inverseDateFormat';
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
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

const QuickEditDeadline = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const [convertedDeadline, setConvertedDeadline] = useState('');
	const [taskDeadline, setTaskDeadline] = useState('');

	useEffect(() => {
		const day = new Date(task?.deadline);
		const formattedDisplayDay = `${String(day.getDate()).padStart(
			2,
			'0'
		)}/${String(day.getMonth() + 1).padStart(2, '0')}/${day.getFullYear()}`;
		setConvertedDeadline(formattedDisplayDay);
	}, [task]);

	const handleSubmitDeadline = async (e) => {
		e.preventDefault();
		const newDeadline = taskDeadline;
		dispatch(setEditedTask({ deadline: newDeadline }));
		try {
			await editTask({ ...editedTask, deadline: newDeadline });
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(
				{ ...editedTask, deadline: newDeadline },
				editedTask.category
			);
			toast.success(
				'La deadline de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour de la deadline de la tâche.');
		}
	};

	const handleDateChange = (date) => {
		const formattedDBDay = `${date.getFullYear()}-${String(
			date.getMonth() + 1
		).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
		setTaskDeadline(formattedDBDay);

		const formattedDisplayDay = `${String(date.getDate()).padStart(
			2,
			'0'
		)}/${String(date.getMonth() + 1).padStart(
			2,
			'0'
		)}/${date.getFullYear()}`;
		setConvertedDeadline(formattedDisplayDay);
	};

	const flatpickrRef = useCallback(
		(node) => {
			if (node !== null && isEditingField.deadline) {
				node.flatpickr.open();
			}
		},
		[isEditingField.deadline]
	);

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(
					setEditingField({
						field: 'deadline',
						value: !isEditingField.deadline,
					})
				);
			}}
			className={
				`text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto ` +
				task.category
			}>
			{!isEditingField.deadline && (
				<span>
					{task.status === 'Archived'
						? inverseDateFormat(task.deadline)
						: task.day}
				</span>
			)}
			{isEditingField.deadline && editedTask?._id === task.taskId ? (
				<div className="relative">
					<form onSubmit={(e) => handleSubmitDeadline(e)}>
						<Flatpickr
							ref={flatpickrRef}
							value={convertedDeadline}
							onChange={(date) => handleDateChange(date[0])}
							options={{
								dateFormat: 'd/m/Y',
								locale: French,
							}}
							className="w-[85px] h-[10px] border-none px-0"
						/>
					</form>
				</div>
			) : (
				isEditingField.deadline && (
					<span>
						{task.status === 'Archived'
							? inverseDateFormat(task.deadline)
							: task.day}
					</span>
				)
			)}
		</div>
	);
};

export default QuickEditDeadline;
