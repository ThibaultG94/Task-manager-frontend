import React from 'react';
import { inverseDateFormat } from '../utils/inverseDateFormat';

const QuickEditDeadline = ({ task, setSelectedTask }) => {
	return (
		<div
			className={
				`text-left mx-auto p-1.5 px-2.5 rounded-lg relative z-10 cursor-auto ` +
				task.category
			}>
			{task.status === 'Archived'
				? inverseDateFormat(task.deadline)
				: task.day}
		</div>
	);
};

export default QuickEditDeadline;
