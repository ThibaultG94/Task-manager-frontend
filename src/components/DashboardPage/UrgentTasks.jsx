import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';
import { selectIsUrgentTasksLoaded, selectUrgentTasks } from '../../store/selectors/taskSelectors';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import { useGetUserId } from '../../api/users/useGetUserId';
import { useEditTask } from '../../api/tasks/useEditTask';
import { useSetTaskNotification } from '../../api/notifications/useSetTaskNotification';
import { useGetComments } from '../../api/comments/useGetComments';
import { useTasksHasBeenUpdated } from '../../utils/useTasksHasBeenUpdated';
import useCheckIfEdited from '../../utils/useCheckIfEdited';
import { formatDateForDisplay } from '../../utils/formatDateForDisplay';
import { getCategoryDay } from '../../utils/getCategoryDay';
import { formatTaskForEditing } from '../../utils/formatTaskForEditing';
import { useUndoActions } from '../../utils/useUndoActions';
import { toast } from 'react-toastify';
import HandleModalTask from '../ModalTask/HandleModalTask';
import LoadingComponent from '../Buttons/LoadingComponent';

const UrgentTasks = () => {
	const dispatch = useDispatch();
	const workspaces = useSelector(selectWorkspaces);
	const urgentTasks = useSelector(selectUrgentTasks);
	const isUrgentTasksLoaded = useSelector(selectIsUrgentTasksLoaded);

	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const setTaskNotification = useSetTaskNotification();
	const getComments = useGetComments();
	const getUserId = useGetUserId();

	const { notifyWithUndo } = useUndoActions();
	
	const [displayTasks, setDisplayTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const checkIfEdited = useCheckIfEdited({
		setIsModalOpen,
		setIsEditing,
		selectedTask,
		formatTaskForEditing,
		setInitialEditedTask,
	});

	const openModal = (e) => {
		e.stopPropagation();
		setIsModalOpen(true);
	};

	const closeModal = async () => {
		await checkIfEdited();
	};

	const checkIfTheUserCanArchiveTask = async (task) => {
		const userId = await getUserId();
		const workspace = workspaces.find(
			(workspace) => workspace._id === task.workspace
		);
		const isSuperAdmin = workspace.members.some(
			(member) =>
				member.userId === userId &&
				member.role === 'superadmin'
		);
		const isAdmin = workspace.members.some(
			(member) =>
				member.userId === userId &&
				member.role === 'admin'
		);
		const isTaskOwner = task.userId === userId;

		if (isSuperAdmin || isAdmin || isTaskOwner) return true;

		return false;
	};

	const validateTask = async (e, task) => {
		e.stopPropagation();
		let newStatus = "Completed";
		const canArchiveTask = await checkIfTheUserCanArchiveTask(task);
		if (canArchiveTask) newStatus = 'Archived';
	
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
			};
			await editTask({ status: newStatus, _id: task.taskId });
			await tasksHasBeenUpdated(task, task.category);
			const notifications = await setTaskNotification(editedTask, userId);
	
			notifyWithUndo(previousTask, notifications); 
		} catch (error) {
			toast.error("Échec de l'archivage de la tâche.");
		}
	};

	useEffect(() => {
		isUrgentTasksLoaded ? setIsLoading(false) : setIsLoading(true);
	}, [isUrgentTasksLoaded]);

	useEffect(() => {
		const updateDisplayTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < 4; i++) {
				if (urgentTasks && urgentTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						urgentTasks[i].deadline
					);
					const day = await formatDateForDisplay(
						urgentTasks[i].deadline
					);
					const category = await getCategoryDay(
						day,
						urgentTasks[i].status,
						urgentTasks[i].deadline
					);
					const workspacesMap = {};
					workspaces?.forEach((workspace) => {
						workspacesMap[workspace._id] = workspace.title;
					});
					const workspaceName =
						workspacesMap[urgentTasks[i].workspaceId];

					updatedTasks.push({
						title: urgentTasks[i].title,
						userId: urgentTasks[i].userId,
						date: formattedDate,
						status: urgentTasks[i].status,
						priority: urgentTasks[i].priority,
						deadline: urgentTasks[i].deadline,
						description: urgentTasks[i].description,
						comments: urgentTasks[i].comments ? urgentTasks[i].comments : [],
						workspace: urgentTasks[i].workspaceId,
						assignedTo: urgentTasks[i].assignedTo,
						archiveDate: urgentTasks[i].archiveDate,
						taskId: urgentTasks[i]._id,
						isOverdue: formattedDate === 'En retard',
						category: category,
						workspaceName: workspaceName,
					});
				}
			}
			setDisplayTasks(updatedTasks);
		};

		updateDisplayTasks();
	}, [urgentTasks]);

	useEffect(() => {
		const resetEditedTask = async () => {
			const formattedTask = await formatTaskForEditing(selectedTask);
			if (formattedTask) {
				dispatch(setInitialEditedTask(formattedTask));
			}
			if (selectedTask) await getComments(selectedTask?.taskId);
		};
		resetEditedTask();
	}, [selectedTask]);

	return (
		<div className="dashboard-card tasks-container">
			<h4 className="pl-2 sm:pl-3 md:pl-4">Tâches urgentes</h4>
			{isLoading ? (
          			<LoadingComponent />
			) : (
				<div className="flex flex-col">
					{displayTasks && displayTasks?.length > 0 ? (
						displayTasks.map((task, index) => (
							<div
								className={`urgent-task ${
									task?.isOverdue ? 'task-overdue' : ''
								}`}
								key={index}
								onClick={(e) => {
									openModal(e);
									setSelectedTask(task);
								}}>
								<div className="urgent-task-todo">
									<div id="check"></div>
									<div className="text-sm sm:text-base max-w-80 pr-4 ellipsis">
										{task?.title}
									</div>
								</div>
								<div className="flex flex-row">
									<div className="mr-10 hidden md:block">
										<div className="font-medium text-dark-purple-2 text-xs sm:text-sm md:text-base">
											{task?.workspaceName}
										</div>
									</div>
									<div className="date-container">
										<div className="date">{task?.date}</div>
									</div>
								</div>
								<div
									className="archive-icon archive-icon-urgent"
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
						))
					) : (
						<div className="no-urgent-tasks">
							<p>Aucune tâche à afficher</p>
						</div>
					)}
				</div>
			)}

			{isModalOpen && (
				<HandleModalTask
					closeModal={closeModal}
					setIsModalOpen={setIsModalOpen}
					isEditing={isEditing}
					setIsEditing={setIsEditing}
				/>
			)}
		</div>
	);
};

export default UrgentTasks;
