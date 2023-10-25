import React from 'react';
import { inverseDateFormat } from '../utils/inverseDateFormat';

const TaskItem = ({ task, openModal, setSelectedTask }) => {
	return (
		<div
			className="task-item"
			onClick={(e) => {
				openModal(e);
				setSelectedTask(task);
			}}>
			<div className="task-title">
				<div className="task-circle"></div>
				{task.title}
			</div>
			<div className={`task-day ` + task.category}>
				{task.status === 'Archived'
					? inverseDateFormat(task.deadline)
					: task.day}
			</div>
			<div className={`task-status ` + task.convertedStatus}>
				{task.convertedStatus}
			</div>
			<div className={`task-priority ` + task.convertedPriority}>
				{task.convertedPriority}
			</div>
			<div className="task-workspace">{task.workspaceTitle}</div>
			<div className="task-assigned">
				<span id="avatarLetterAssigned">{task.assignedToLetter}</span>
			</div>
		</div>
	);
};

export default TaskItem;
