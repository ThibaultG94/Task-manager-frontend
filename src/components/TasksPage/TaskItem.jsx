import React, { useEffect, useState } from 'react';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import { useGetWorkspace } from '../../api/workspaces/useGetWorkspace';
import getUserId from '../../api/users/getUserId';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import { toast } from 'react-toastify';
import ButtonToGrab from '../Buttons/ButtonToGrab';
import QuickEditTitle from './QuickEditTitle';
import QuickEditDeadline from './QuickEditDeadline';
import QuickEditStatus from './QuickEditStatus';
import QuickEditPriority from './QuickEditPriority';
import QuickEditWorkspace from './QuickEditWorkspace';
import ButtonToEditTaskInModal from '../Buttons/ButtonToEditTaskInModal';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();
	const getWorkspace = useGetWorkspace();

	const [isSuperAdmin, setIsSuperAdmin] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isTaskOwner, setIsTaskOwner] = useState(false);

	const [isTitleCanBeEdited, setIsTitleCanBeEdited] = useState(false);
	const [isStatusCanBeEdited, setIsStatusCanBeEdited] = useState(false);
	const [isDeadlineCanBeEdited, setIsDeadlineCanBeEdited] = useState(false);
	const [isPriorityCanBeEdited, setIsPriorityCanBeEdited] = useState(false);

	useEffect(() => {
		const checkUserPrivileges = async () => {
			if (task && task.workspace) {
				const workspace = await getWorkspace(task.workspace);
				const userId = await getUserId();
		
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

		try {
			const userId = await getUserId();
			const editedTask = {
				status: newStatus,
				_id: task.taskId,
			}
			await editTask({ status: newStatus, _id: task.taskId });
			await tasksHasBeenUpdated(task, task.category);
			await setTaskNotification(editedTask, userId);
			toast.success('La tâche a été archivée avec succès !');
		} catch (error) {
			toast.error("Échec de l'archivage de la tâche.");
		}
	};

	return (
		<div className="task-item relative py-6 px-2 sm:px-3 md:px-4 mx-auto">
			<ButtonToGrab />
			<QuickEditTitle task={task} setSelectedTask={setSelectedTask} isTitleCanBeEdited={isTitleCanBeEdited} />
			<QuickEditDeadline task={task} setSelectedTask={setSelectedTask} isDeadlineCanBeEdited={isDeadlineCanBeEdited} />
			<QuickEditStatus task={task} setSelectedTask={setSelectedTask} isStatusCanBeEdited={isStatusCanBeEdited} />
			<QuickEditPriority task={task} setSelectedTask={setSelectedTask} isPriorityCanBeEdited={isPriorityCanBeEdited} />
			<QuickEditWorkspace task={task} setSelectedTask={setSelectedTask} />

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
				</div>
			</div>
		</div>
	);
};

export default TaskItem;
