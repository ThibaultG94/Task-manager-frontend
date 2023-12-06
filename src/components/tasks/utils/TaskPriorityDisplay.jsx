import React from 'react';

const TaskPriorityDisplay = ({ priority, convertedPriority }) => {
	const priorityIcon = {
		Urgent: 'fa-exclamation-triangle',
		'Priorité haute': 'fa-arrow-up',
		'Priorité moyenne': 'fa-equals',
		'Priorité faible': 'fa-arrow-down',
	};

	return (
		<span>
			<i
				className={`fas ${priorityIcon[convertedPriority]} block lg:hidden`}></i>
			<span className="hidden lg:block">{convertedPriority}</span>
		</span>
	);
};

export default TaskPriorityDisplay;
