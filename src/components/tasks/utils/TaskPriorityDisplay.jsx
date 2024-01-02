import React from 'react';

const TaskPriorityDisplay = ({ className, convertedPriority }) => {
	const priorityIcon = {
		Urgent: 'fa-exclamation-triangle',
		Haute: 'fa-arrow-up',
		Moyenne: 'fa-equals',
		Faible: 'fa-arrow-down',
	};

	return (
		<span className={className}>
			<i
				className={`fas ${priorityIcon[convertedPriority]} block lg:hidden`}></i>
			<span className="ellipsis hidden lg:inline">
				{convertedPriority}
			</span>
		</span>
	);
};

export default TaskPriorityDisplay;
