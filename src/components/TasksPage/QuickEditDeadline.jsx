import React, { useCallback, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import {
	resetEditState,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { useGetUserId } from '../../api/users/useGetUserId';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import useWindowSize from '../../utils/useWindowSize';
import { inverseDateFormat, formatDateForResponsive, formatDateArchived } from '../../utils/dateFormatTools';
import { toast } from 'react-toastify';
import CloseDeadline from '../Buttons/CloseDeadline';
import LoadingEditComponent from '../Buttons/LoadingEditComponent';

const QuickEditDeadline = ({ task, setSelectedTask, isDeadlineCanBeEdited, isActive, activeStyle }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	
	const editTask = useEditTask();
	const getUserId = useGetUserId();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();
	
	const [width] = useWindowSize();
	const isLargeScreen = width > 1023;

	const [convertedDeadline, setConvertedDeadline] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	
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
		setIsLoading(true);
		dispatch(setEditedTask({ deadline: newDeadline }));
		try {
			const userId = await getUserId();
			let assigned = [];
			for (const member of editedTask.assignedTo) {
				assigned.push(member.userId);
			}

			const task = {
				_id: editedTask._id,
				title: editedTask.title,
				status: editedTask.status,
				priority: editedTask.priority,
				deadline: newDeadline,
				description: editedTask.description,
				workspaceId: editedTask.workspaceId,
				assignedTo: assigned,
				category: editedTask.category,
			};

			await editTask(task);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(
				{ ...editedTask, deadline: newDeadline },
				editedTask.category
			);
			await setTaskNotification(editedTask, userId);
			setIsLoading(false);
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

	const editDeadline = (task) => {
		setSelectedTask(task);
		if (isDeadlineCanBeEdited) dispatch(setExclusiveEditingField('deadline'));
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			onDoubleClick={() => editDeadline(task)}
			className={
				`cursor-auto flex items-center mx-auto p-0.5 md:p-1 lg:p-1.5 md:p px-1 sm:px-1.5 md:px-2 lg:px-2.5 rounded-lg select-none text-xs md:text-sm relative lg:text-base 
				${classInFunctionOfDayorCategory} ${isActive ? activeStyle : ""}`
			}>
			{!isEditingField.deadline && !isLoading && (
				<>
					<span className="block lg:hidden">
						{formatDateForResponsive(task.deadline)}{' '}
					</span>
					<span className="hidden lg:block">
						{task.status === 'Archived'
							? formatDateArchived(task.archiveDate)
							: task.day}
					</span>
				</>
			)}
			{isEditingField.deadline && editedTask?._id === task.taskId && !isLoading ? (
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
							{formatDateForResponsive(task.deadline)}
						</span>
					)}
				</>
			) : (
				isEditingField.deadline && !isLoading && (
					<>
						<span className="block lg:hidden">
							{formatDateForResponsive(task.deadline)}{' '}
						</span>
						<span className="hidden lg:block">
							{task.status === 'Archived'
								? inverseDateFormat(task.deadline)
								: task.day}{' '}
						</span>
					</>
				)
			)}
			{isLoading && (
				<LoadingEditComponent />
			)}
		</div>
	);
};

export default QuickEditDeadline;
