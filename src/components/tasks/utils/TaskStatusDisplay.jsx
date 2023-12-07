import React from 'react';

const TaskStatusDisplay = ({ className, convertedStatus, status }) => {
	const statusIcon = {
		Archived: 'fa-archive',
		Completed: 'fa-check',
		'In Progress': 'fa-spinner',
		Pending: 'fa-list',
	};

	return (
		<span className={className}>
			<i className={`fas ${statusIcon[status]} block md:hidden`}></i>
			<span className="hidden md:inline">{convertedStatus}</span>
		</span>
	);
};

export default TaskStatusDisplay;
