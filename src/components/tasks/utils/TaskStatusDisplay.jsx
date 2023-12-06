// TaskStatusDisplay.js
import React from 'react';

const TaskStatusDisplay = ({ status, convertedStatus }) => {
	const statusIcon = {
		Archived: 'fa-archive',
		Completed: 'fa-check',
		'In Progress': 'fa-spinner',
		Pending: 'fa-list',
	};

	return (
		<span>
			<i className={`fas ${statusIcon[status]} block md:hidden`}></i>
			<span className="hidden md:inline">{convertedStatus}</span>
		</span>
	);
};

export default TaskStatusDisplay;
