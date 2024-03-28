import React from 'react';
import { FaClipboardList, FaSpinner, FaCheck, FaArchive } from 'react-icons/fa';
import { convertStatusCount } from '../../utils/convertTools';

const statusToIcon = {
	Pending: FaClipboardList,
	'In Progress': FaSpinner,
	Completed: FaCheck,
	Archived: FaArchive,
};

export const TaskStatusIcon = ({ status, count }) => {
	const Icon = statusToIcon[status];
	const statusColorClass = `bg-status-${status
		.toLowerCase()
		.replace(/\s/g, '')}`;
	const translatedStatus = convertStatusCount(status, count);

	return (
		<div
			className={`flex items-center ${statusColorClass} mr-2 px-2.5 py-1 rounded text-xs`}
			title={translatedStatus}>
			<Icon className="text-base" style={{ verticalAlign: 'middle' }} />
			<span className="text-xs ml-1" style={{ verticalAlign: 'middle' }}>
				{count}
			</span>
		</div>
	);
};
