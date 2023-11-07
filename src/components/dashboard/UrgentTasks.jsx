import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUrgentTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';
import { setInitialEditedTask } from '../../store/feature/tasks.slice';
import { formatTaskForEditing } from '../utils/formatTaskForEditing';
import { getCategoryDay } from '../utils/getCategoryDay';
import ModalTask from '../tasks/ModalTask';
import useCheckIfEdited from './utils/checkIfEdited';

const UrgentTasks = () => {
	const dispatch = useDispatch();
	const urgentTasks = useSelector(selectUrgentTasks);
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

	useEffect(() => {
		const updateDisplayTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < 3; i++) {
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
		<div className="tasks-container dashboard-card">
			<h4 className="pl-4">Tâches urgentes</h4>
			<div className="urgent-task-container">
				{displayTasks?.length > 0 ? (
					displayTasks.map((task, index) => (
						<div
							className={`urgent-task ${
								task.isOverdue ? 'task-overdue' : ''
							}`}
							key={index}
							onClick={(e) => {
								openModal(e);
								setSelectedTask(task);
							}}>
							<div className="urgent-task-todo">
								<div id="check"></div>
								<div>{task.title}</div>
							</div>
							<div className="date-container">
								<div className="date">{task.date}</div>
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
				<ModalTask
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
