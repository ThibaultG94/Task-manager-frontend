import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import {
	resetEditState,
	setEditingField,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { setEditedTask } from '../../store/feature/tasks.slice';
import { useEditTask } from '../../api/tasks/editTask';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';
import { toast } from 'react-toastify';
import CloseTitle from './utils/CloseTitle';

const QuickEditTitle = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputTitleRef = useRef(null);

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
			await editTask({ ...editedTask, title: newTitle });
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			toast.success(
				'Le titre de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour du titre de la tâche.');
		}
	};

	return (
		<div
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(setExclusiveEditingField('title'));
			}}
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
