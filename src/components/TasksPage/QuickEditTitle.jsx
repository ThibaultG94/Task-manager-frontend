import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import {
	resetEditState,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { setEditedTask } from '../../store/feature/tasks.slice';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import getUserId from '../../api/users/getUserId';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';
import CloseTitle from '../Buttons/CloseTitle';

const QuickEditTitle = ({ task, setSelectedTask, isTitleCanBeEdited }) => {
	const dispatch = useDispatch();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);

	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();

	const inputTitleRef = useRef(null);

	const editTitle = (task) => {
		setSelectedTask(task);
		if (isTitleCanBeEdited) dispatch(setExclusiveEditingField('title'));
	};

	useEffect(() => {
		if (isEditingField.title && inputTitleRef.current) {
			inputTitleRef.current.focus();
		}
	}, [isEditingField.title]);

	const handleSubmitTitle = async (e) => {
		e.preventDefault();
		const newTitle = inputTitleRef.current.value;
		if (!newTitle) {
			toast.error('Le titre ne peut pas être vide.');
			return;
		}
		if (newTitle === task.title) {
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			return;
		}
		dispatch(setEditedTask({ title: newTitle }));
		try {
			const userId = await getUserId();
			await editTask({ ...editedTask, title: newTitle });
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			await setTaskNotification(editedTask, userId);
			toast.success(
				'Le titre de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour du titre de la tâche.');
		}
	};

	return (
		<div
			onDoubleClick={() => editTitle(task)}
			className="cursor-auto flex justify-start overflow-hidden relative rounded-md self-center text-xs sm:text-sm md:text-base">
			{!isEditingField.title && (
				<span className="ellipsis">{task?.title}</span>
			)}
			{isEditingField.title && editedTask?._id === task.taskId ? (
				<div className="md:w-10/12">
					<form
						className="w-full md:block hidden"
						onSubmit={(e) => handleSubmitTitle(e)}>
						<input
							type="text"
							defaultValue={task?.title}
							className="border-0 p-1 w-full rounded-md"
							maxLength={60}
							ref={inputTitleRef}
						/>
						<CloseTitle />
						<button
							type="submit"
							style={{ display: 'none' }}></button>
					</form>
					<span className="ellipsis md:hidden block">
						{task?.title}
					</span>
				</div>
			) : (
				isEditingField.title && (
					<span className="ellipsis">{task?.title}</span>
				)
			)}
		</div>
	);
};

export default QuickEditTitle;
