import React, { useEffect, useState } from 'react';
import ModalTasks from '../tasks/ModalTasks';
import { useSelector } from 'react-redux';
import { selectUrgentTasks } from '../../store/selectors/taskSelectors';
import { formatDateForDisplay } from '../utils/formatDateForDisplay';

const UrgentTasks = () => {
	const [modal, setModal] = useState(false);
	const urgentTasks = useSelector(selectUrgentTasks);
	const [displayTasks, setDisplayTasks] = useState([]);

	useEffect(() => {
		const updateDisplayTasks = async () => {
			const updatedTasks = [];
			for (let i = 0; i < 3; i++) {
				if (urgentTasks[i]) {
					const formattedDate = await formatDateForDisplay(
						urgentTasks[i].deadline
					);
					updatedTasks.push({
						title: urgentTasks[i].title,
						date: formattedDate,
						isOverdue: formattedDate === 'En retard',
					});
				} else {
					updatedTasks.push(null);
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
				{displayTasks.map((task, index) =>
					task ? (
						<div
							className={`urgent-task ${
								task.isOverdue ? 'task-overdue' : ''
							}`}
							key={index}
							onClick={() => setModal(true)}>
							<div className="urgent-task-todo">
								<div id="check"></div>
								<div>{task.title}</div>
							</div>
							<div className="date-container">
								<div className="date">{task.date}</div>
							</div>
						</div>
					) : (
						<div className="no-urgent-tasks" key={index}>
							<p>Aucune tâche à afficher</p>
						</div>
					)
				)}
			</div>

			{modal && <ModalTasks />}
		</div>
	);
};

export default UrgentTasks;
