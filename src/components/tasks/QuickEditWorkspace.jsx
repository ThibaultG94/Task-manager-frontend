import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditTask } from '../../api/tasks/editTask';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';
import { selectIsEditingField } from '../../store/selectors/editStateSelectors';
import { selectEditedTask } from '../../store/selectors/taskSelectors';
import { setEditedTask } from '../../store/feature/tasks.slice';
import {
	resetEditState,
	setExclusiveEditingField,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { toast } from 'react-toastify';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import ArrowDown from '../modal/ArrowDown';
import { useWindowWidth } from './utils/useWindowWidth';
import { getInitials } from './utils/getInitials';
import CloseWorkspace from './utils/CloseWorkspace';

const QuickEditWorkspace = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const userWorkspaces = useSelector(selectWorkspaces);
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputWorkspaceRef = useRef(null);
	const screenWidth = useWindowWidth();
	const [workspaces, setWorkspaces] = useState([]);
	const classDiv =
		'cursor-auto flex h-10 items-center m-auto relative rounded-lg self-enter text-xs lg:text-sm xl:text-base';

	useEffect(() => {
		setWorkspaces(userWorkspaces);
	}, [userWorkspaces]);

	const handleSubmitWorkspace = async (workspaceId) => {
		const newWorkspace = workspaceId;
		dispatch(setEditedTask({ workspace: newWorkspace }));
		try {
			await editTask({ ...editedTask, workspaceId: newWorkspace });
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(editedTask, editedTask.category);
			toast.success(
				'Le workspace de la tâche a été mise à jour avec succès !'
			);
		} catch (error) {
			toast.error('Échec de la mise à jour de le workspace de la tâche.');
		}
	};

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			// onDoubleClick={() => {
			// 	setSelectedTask(task);
			// 	dispatch(setExclusiveEditingField('workspace'));
			// }}
			className={
				isEditingField.workspace
					? `${classDiv} z-10`
					: `${classDiv} ellipsis`
			}>
			{!isEditingField.workspace && (
				<span className="ellipsis">
					{screenWidth < 480
						? getInitials(task.workspaceTitle)
						: task.workspaceTitle}
				</span>
			)}
			{isEditingField.workspace && editedTask?._id === task.taskId ? (
				<>
					<form className="relative lg:block hidden">
						<select
							className="block bg-white appearance-none border border-gray-300 hover:border-gray-500 py-1 text-center rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer pl-2 pr-4"
							defaultValue={editedTask?.workspaceId}
							ref={inputWorkspaceRef}
							onChange={(e) =>
								handleSubmitWorkspace(e.target.value)
							}>
							{workspaces &&
								workspaces.map((workspace) => (
									<option
										value={workspace._id}
										key={workspace._id}>
										{workspace.title}
									</option>
								))}
						</select>
						<ArrowDown />
						<CloseWorkspace />
					</form>
					<span className="ellipsis max-w-16 lg:hidden block">
						{screenWidth < 480
							? getInitials(task.workspaceTitle)
							: task.workspaceTitle}
					</span>
				</>
			) : (
				isEditingField.workspace && (
					<span className="ellipsis max-w-16">
						{screenWidth < 480
							? getInitials(task.workspaceTitle)
							: task.workspaceTitle}
					</span>
				)
			)}
		</div>
	);
};

export default QuickEditWorkspace;
