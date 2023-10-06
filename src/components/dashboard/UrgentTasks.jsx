import React, { useState } from 'react';
import ModalTasks from '../tasks/ModalTasks';

const UrgentTasks = () => {
	const [modal, setModal] = useState(false);

	return (
		<div className="tasks-container dashboard-card">
			<h4 className="pl-4">Tâches urgentes</h4>
			<div className="urgent-task-container">
				<div
					className="urgent-task urgent-task-first"
					onClick={() => setModal(true)}>
					<div className="urgent-task-todo">
						<div id="check"></div>
						<div id="firstTask"></div>
					</div>
					<div className="date-container">
						<div className="date" id="firstDate"></div>
					</div>
				</div>

				<div
					className="urgent-task urgent-task-second"
					onClick={() => setModal(true)}>
					<div className="urgent-task-todo">
						<div id="check"></div>
						<div id="secondTask"></div>
					</div>
					<div className="date-container">
						<div className="date" id="secondDate"></div>
					</div>
				</div>

				<div
					className="urgent-task urgent-task-third"
					onClick={() => setModal(true)}>
					<div className="urgent-task-todo">
						<div id="check"></div>
						<div id="thirdTask"></div>
					</div>
					<div className="date-container">
						<div className="date" id="thirdDate"></div>
					</div>
				</div>

				<div className="no-urgent-tasks" style={{ display: 'none' }}>
					<p>Aucune tâche à afficher</p>
				</div>
			</div>

			{modal && <ModalTasks />}
		</div>
	);
};

export default UrgentTasks;
