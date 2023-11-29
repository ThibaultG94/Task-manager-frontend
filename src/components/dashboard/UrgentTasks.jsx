import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrgentTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import { formatTaskForEditing } from '../utils/formatTaskForEditing';
import { getCategoryDay } from '../utils/getCategoryDay';
import HandleModalTask from '../tasks/HandleModalTask';
import useCheckIfEdited from './utils/checkIfEdited';
import { useEditTask } from '../../api/editTask';
import { toast } from 'react-toastify';
import { useTasksHasBeenUpdated } from '../tasks/TasksHasBeenUpdated';
import { selectWorkspaces } from '../../store/selectors/workspaceSelectors';

const UrgentTasks = () => {
	const dispatch = useDispatch();
	const editTask = useEditTask();
	const workspaces = useSelector(selectWorkspaces);
	const urgentTasks = useSelector(selectUrgentTasks);
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();
	const [displayTasks, setDisplayTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

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

	const validateTask = async (e, task) => {
		e.stopPropagation();
		const newStatus = 'Archived';

		try {
			await editTask({ status: newStatus, _id: task.taskId });
			await tasksHasBeenUpdated(task, task.category);
			toast.success('La tâche a été archivée avec succès !');
		} catch (error) {
			toast.error("Échec de l'archivage de la tâche.");
		}
	};

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
					const workspaceName = await workspaces?.find(
						(workspace) =>
							workspace._id === urgentTasks[i].workspaceId
					).title;
					updatedTasks.push({
						title: urgentTasks[i].title,
						date: formattedDate,
						status: urgentTasks[i].status,
						priority: urgentTasks[i].priority,
						deadline: urgentTasks[i].deadline,
						description: urgentTasks[i].description,
						comments: urgentTasks[i].comments,
						workspace: urgentTasks[i].workspaceId,
						assignedTo: urgentTasks[i].assignedTo,
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
		};
		resetEditedTask();
	}, [selectedTask]);

	return (
		<div className="dashboard-card tasks-container">
			<h4 className="pl-2 sm:pl-3 md:pl-4">Tâches urgentes</h4>
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
								<div className="text-sm sm:text-base">
									{task?.title}
								</div>
							</div>
							<div className="flex flex-row">
								<div className="mr-10 hidden sm:block">
									<div className="font-medium text-dark-purple-2 text-xs sm:text-sm md:text-base">
										{task?.workspaceName}
									</div>
								</div>
								<div className="date-container">
									<div className="date">{task?.date}</div>
								</div>
							</div>
							<div
								className="archive-icon"
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
