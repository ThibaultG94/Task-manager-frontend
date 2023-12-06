import React from 'react';

const TaskPriorityDisplay = ({ priority, convertedPriority }) => {
	const priorityIcon = {
		Urgent: 'fa-exclamation-triangle',
		'Priorité haute': 'fa-arrow-up',
		'Priorité moyenne': 'fa-equals',
		'Priorité faible': 'fa-arrow-down',
	};

	return (
		<span className="flex justify-start overflow-hidden relative">
			<i
				className={`fas ${priorityIcon[convertedPriority]} block lg:hidden`}></i>
			<span className="ellipsis hidden lg:block">
				{convertedPriority}
			</span>
		</span>
	);
};

export default TaskPriorityDisplay;
