import React from 'react';
import QuickEditTitle from './QuickEditTitle';
import QuickEditDeadline from './QuickEditDeadline';
import QuickEditStatus from './QuickEditStatus';
import QuickEditPriority from './QuickEditPriority';
import QuickEditWorkspace from './QuickEditWorkspace';
import ButtonToEditTaskInModal from './ButtonToEditTaskInModal';
import ButtonToGrab from './ButtonToGrab';
import { useEditTask } from '../../api/editTask';
import { useTasksHasBeenUpdated } from './TasksHasBeenUpdated';
import { toast } from 'react-toastify';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	const editTask = useEditTask();
	const tasksHasBeenUpdated = useTasksHasBeenUpdated();

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
	return (
		<div className="task-item relative py-5 px-2 sm:px-3 md:px-4 mx-auto">
			<ButtonToGrab />
			<QuickEditTitle task={task} setSelectedTask={setSelectedTask} />
			<QuickEditDeadline task={task} setSelectedTask={setSelectedTask} />
			<QuickEditStatus task={task} setSelectedTask={setSelectedTask} />
			<QuickEditPriority task={task} setSelectedTask={setSelectedTask} />
			<QuickEditWorkspace task={task} setSelectedTask={setSelectedTask} />
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
	);
};

export default TaskItem;
