import React, { useCallback, useEffect, useState } from 'react';
import { inverseDateFormat } from '../utils/inverseDateFormat';
import { useDispatch, useSelector } from 'react-redux';
import { useEditTask } from '../../api/tasks/editTask';
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
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import { formatDate } from './utils/formatDateForResponsive';
import useWindowSize from '../utils/useWindowSize';
import CloseDeadline from './utils/CloseDeadline';
import { formatDateArchived } from './utils/formatDateArchived';

const QuickEditDeadline = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const [convertedDeadline, setConvertedDeadline] = useState('');
	const [width] = useWindowSize();
	const isLargeScreen = width > 1023;

	const dayWeek = [
		'Lundi',
		'Mardi',
		'Mercredi',
		'Jeudi',
		'Vendredi',
		'Samedi',
		'Dimanche',
		'Demain',
	];

	const classInFunctionOfDayorCategory = dayWeek.includes(task.day)
		? task.day
		: task.category;

	useEffect(() => {
		const day = new Date(task?.deadline);
		const formattedDisplayDay = `${String(day.getDate()).padStart(
			2,
			'0'
		)}/${String(day.getMonth() + 1).padStart(2, '0')}/${day.getFullYear()}`;
		setConvertedDeadline(formattedDisplayDay);
	}, [task]);

	const handleSubmitDeadline = async (newDeadline) => {
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

	const handleDateChange = async (date) => {
		const formattedDBDay = `${date.getFullYear()}-${String(
			date.getMonth() + 1
		).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

		const formattedDisplayDay = `${String(date.getDate()).padStart(
			2,
			'0'
		)}/${String(date.getMonth() + 1).padStart(
			2,
			'0'
		)}/${date.getFullYear()}`;
		setConvertedDeadline(formattedDisplayDay);

		return formattedDBDay;
	};

	const flatpickrRef = useCallback(
		(node) => {
			if (node !== null && isEditingField.deadline) {
				node.flatpickr.open();
			}
		},
		[isEditingField.deadline]
	);

	const handleSubmitDeadlineOnEnter = async (date) => {
		const formattedDBDay = await handleDateChange(date[0]);
		handleSubmitDeadline(formattedDBDay);
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(setExclusiveEditingField('deadline'));
			}}
			className={
				`cursor-auto flex items-center mx-auto p-0.5 md:p-1 lg:p-1.5 md:p px-1 sm:px-1.5 md:px-2 lg:px-2.5 rounded-lg select-none text-xs md:text-sm relative lg:text-base ` +
				classInFunctionOfDayorCategory
			}>
			{!isEditingField.deadline && (
				<>
					<span className="block lg:hidden">
						{formatDate(task.deadline)}{' '}
					</span>
					<span className="hidden lg:block">
						{task.status === 'Archived'
							? formatDateArchived(task.archiveDate)
							: task.day}
					</span>
				</>
			)}
			{isEditingField.deadline && editedTask?._id === task.taskId ? (
				<>
					{isLargeScreen ? (
						<div className="relative hidden sm:block select-none">
							<form>
								<Flatpickr
									ref={flatpickrRef}
									value={convertedDeadline}
									onChange={(date) => {
										handleSubmitDeadlineOnEnter(date);
									}}
									options={{
										dateFormat: 'd/m/Y',
										locale: French,
									}}
									className="w-14 sm:w-16 md:w-20 lg:w-24 h-6 select-none border-none rounded pl-1"
								/>
								<CloseDeadline />
							</form>
						</div>
					) : (
						<span className="ellipsis">
							{formatDate(task.deadline)}
						</span>
					)}
				</>
			) : (
				isEditingField.deadline && (
					<>
						<span className="block lg:hidden">
							{formatDate(task.deadline)}{' '}
						</span>
						<span className="hidden lg:block">
							{task.status === 'Archived'
								? inverseDateFormat(task.deadline)
								: task.day}{' '}
						</span>
					</>
				)
			)}
		</div>
	);
};

export default QuickEditDeadline;
