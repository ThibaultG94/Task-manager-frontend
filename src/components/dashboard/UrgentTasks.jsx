import React, { useEffect, useState } from 'react';
import ModalTask from '../tasks/ModalTask';
import { useSelector } from 'react-redux';
import { selectUrgentTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';

const UrgentTasks = () => {
	const [modal, setModal] = useState(false);
	const urgentTasks = useSelector(selectUrgentTasks);
	const [displayTasks, setDisplayTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);

	useEffect(() => {
		const updateDisplayTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < 3; i++) {
				if (urgentTasks && urgentTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						urgentTasks[i].deadline
					);
					updatedTasks.push({
						title: urgentTasks[i].title,
						date: formattedDate,
						isOverdue: formattedDate === 'En retard',
					});
				}
			}
			setDisplayTasks(updatedTasks);
		};

		updateDisplayTasks();
	}, [urgentTasks]);

	return (
		<div className="tasks-container dashboard-card">
			<h4 className="pl-4">Tâches urgentes</h4>
			<div className="urgent-task-container">
				{displayTasks?.length > 0 ? (
					displayTasks.map((task, index) => (
						<div
							className={`urgent-task ${
								task ? 'task-overdue' : ''
							}`}
							key={index}
							onClick={() => {
								setModal(true);
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

			{modal && <ModalTask task={selectedTask} />}
		</div>
	);
};

export default UrgentTasks;
