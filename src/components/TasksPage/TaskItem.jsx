import React, { useEffect, useState } from 'react';
import getUserId from '../../api/users/getUserId';
import { useDispatch, useSelector } from 'react-redux';
import {
	resetEditState,
	setHasEdited,
} from '../../store/feature/editState.slice';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import { useDeleteTask } from '../../api/tasks/useDeleteTask';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { useUndoActions } from '../../utils/useUndoActions';
import { toast } from 'react-toastify';
import ButtonToGrab from '../Buttons/ButtonToGrab';
import QuickEditTitle from './QuickEditTitle';
import QuickEditDeadline from './QuickEditDeadline';
import QuickEditStatus from './QuickEditStatus';
import QuickEditPriority from './QuickEditPriority';
import QuickEditWorkspace from './QuickEditWorkspace';
import ButtonToEditTaskInModal from '../Buttons/ButtonToEditTaskInModal';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const deleteTask = useDeleteTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();

	const userWorkspaces = useSelector(selectWorkspaces);

	const { notifyWithUndo } = useUndoActions();

	const [isSuperAdmin, setIsSuperAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isTaskOwner, setIsTaskOwner] = useState(false);

	const [isTitleCanBeEdited, setIsTitleCanBeEdited] = useState(false);
	const [isStatusCanBeEdited, setIsStatusCanBeEdited] = useState(false);
	const [isDeadlineCanBeEdited, setIsDeadlineCanBeEdited] = useState(false);
	const [isPriorityCanBeEdited, setIsPriorityCanBeEdited] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const activeStyle = 'cursor-pointer';

	useEffect(() => {
		const checkUserPrivileges = async () => {
			if (task && task.workspace) {
				const workspace = userWorkspaces.find(
					(workspace) => workspace._id === task.workspace
				);
				const userId = await getUserId();

				if (workspace && Array.isArray(workspace.members)) {
					const isSuperAdminVerification = workspace.members.some(
						(member) => member.userId == userId && member.role === 'superadmin'
					);
					const isAdminVerification = workspace.members.some(
						(member) => member.userId == userId && member.role === 'admin'
					);
					const isTaskOwner = task.userId == userId;
		
					setIsSuperAdmin(isSuperAdminVerification);
					setIsAdmin(isAdminVerification);
					setIsTaskOwner(isTaskOwner);
				} else {
					setIsSuperAdmin(false);
					setIsAdmin(false);
					setIsTaskOwner(task.userId == userId);
				}
			}
		};
		

		checkUserPrivileges();
	}, [task]);

	useEffect(() => {
		if (isSuperAdmin || isAdmin || isTaskOwner) {
		  setIsTitleCanBeEdited(true);
		  setIsStatusCanBeEdited(true);
		  setIsDeadlineCanBeEdited(true);
		  setIsPriorityCanBeEdited(true);
		  setIsActive(true);
		}
	  }, [isSuperAdmin, isAdmin, isTaskOwner]);

	const validateTask = async (e, task) => {
		e.stopPropagation();
		let newStatus;

		if (isStatusCanBeEdited) {
			newStatus = 'Archived';
		 } else {
			newStatus = 'Completed';
		} 

		const previousTask = {
			status: task.status,
			taskId: task.taskId,
			deadline: task.deadline,
		};

		try {
			const userId = await getUserId();
			const editedTask = {
				status: newStatus,
				_id: task.taskId,
				deadline: task.deadline,
			}
			await editTask({ status: newStatus, _id: task.taskId });
			await tasksHasBeenUpdated(editedTask, task.category);
			const notifications = await setTaskNotification(editedTask, userId);

			notifyWithUndo(previousTask, notifications); 
		} catch (error) {
			toast.error("Échec de l'archivage de la tâche.");
		}
	};

	const removeTask = async () => {
		try {
			await deleteTask(task.taskId);
			dispatch(resetEditState());
			dispatch(setHasEdited(false));
			await tasksHasBeenUpdated(task, task.category);
			toast.success('La tâche a été supprimée avec succès !');
		} catch (error) {
			toast.error('Échec de la suppression de la tâche.');
			return;
		}
	};

	const handleDelete = async (e) => {
		e.stopPropagation();
		const confirmation = window.confirm(
			'Etes-vous sûr de vouloir supprimer cette tâche ?'
		);

		if (confirmation) {
			await removeTask();
		}
	  };

	return (
		<div className="task-item relative py-6 px-2 sm:px-3 md:px-4 mx-auto">
			<ButtonToGrab />
			<QuickEditTitle task={task} setSelectedTask={setSelectedTask} isTitleCanBeEdited={isTitleCanBeEdited} isActive={isActive} activeStyle={activeStyle} />
			<QuickEditDeadline task={task} setSelectedTask={setSelectedTask} isDeadlineCanBeEdited={isDeadlineCanBeEdited} isActive={isActive} activeStyle={activeStyle} />
			<QuickEditStatus task={task} setSelectedTask={setSelectedTask} isStatusCanBeEdited={isStatusCanBeEdited} />
			<QuickEditPriority task={task} setSelectedTask={setSelectedTask} isPriorityCanBeEdited={isPriorityCanBeEdited} isActive={isActive} activeStyle={activeStyle} />
			<QuickEditWorkspace task={task} setSelectedTask={setSelectedTask} isActive={isActive} activeStyle={activeStyle} />

			<div className='flex justify-between'>
				<div className="hidden sm:flex items-center">
					<div className="bg-dark-blue cursor-auto flex h-8 items-center justify-center mx-auto overflow-hidden p-1.5 px-2.5 relative rounded-full w-8">
						<span id="avatarLetterAssigned">
							{task.assignedToLetter}
						</span>
					</div>
				</div>

				<ButtonToEditTaskInModal
					openModal={openModal}
					setSelectedTask={setSelectedTask}
					task={task}
					/>

				<div className='relative w-8'>
					{task.category === 'archived-tasks' ? (
						<div
						className="delete-icon"
						onClick={(e) => handleDelete(e, task)}>
						  <svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6">
							  <path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12" />
						  </svg>
					  </div>					  
					) : (
						<div
							className="archive-icon archive-icon-item"
							onClick={(e) => validateTask(e, task)}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M4.5 12.75l6 6 9-13.5"
										/>
								</svg>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskItem;
