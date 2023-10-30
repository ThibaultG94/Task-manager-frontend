import React, { useEffect, useRef, useState } from 'react';
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
import { useGetWorkspace } from '../../api/getWorkspace';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import ArrowDown from '../modal/ArrowDown';

const QuickEditWorkspace = ({ task, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const getWorkspace = useGetWorkspace();
	const userWorkspaces = useSelector(selectWorkspaces);
	const isEditingField = useSelector(selectIsEditingField);
	const editedTask = useSelector(selectEditedTask);
	const inputWorkspaceRef = useRef(null);
	const [convertedWorkspace, setConvertedWorkspace] = useState('');
	const [workspaces, setWorkspaces] = useState([]);

	// useEffect(() => {
	// 	const fetchConvertedWorkspace = async () => {
	// 		const workspace = await getWorkspace(editedTask?.workspaceId);
	// 		setConvertedWorkspace(workspace?.title);
	// 	};

	// 	if (editedTask && editedTask?.workspaceId) fetchConvertedWorkspace();
	// }, [editedTask]);

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
			onDoubleClick={() => {
				setSelectedTask(task);
				dispatch(
					setEditingField({
						field: 'workspace',
						value: !isEditingField.workspace,
					})
				);
			}}
			className="text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto">
			{!isEditingField.workspace && <span>{task.workspaceTitle}</span>}
			{isEditingField.workspace && editedTask?._id === task.taskId ? (
				<form className="relative">
					<select
						className="block bg-transparent appearance-none border border-gray-300 hover:border-gray-500 px-0 pr-2 py-[1px] text-center rounded shadow leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
						defaultValue={editedTask?.workspaceId}
						ref={inputWorkspaceRef}
						onChange={(e) => handleSubmitWorkspace(e.target.value)}
						onDoubleClick={() => {
							dispatch(
								setEditingField({
									field: 'workspace',
									value: !isEditingField.workspace,
								})
							);
						}}>
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
				</form>
			) : (
				isEditingField.workspace && <span>{task.workspaceTitle}</span>
			)}
		</div>
	);
};

export default QuickEditWorkspace;
