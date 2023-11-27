import { convertStatusCount } from './utils/convertStatusCount';

export const TaskStatusCount = ({ status, count }) => {
	const translatedStatus = convertStatusCount(status, count);
	const statusColorClass = `bg-status-${status
		.toLowerCase()
		.replace(/\s/g, '')}`;

	return (
		<span
			className={`${statusColorClass} mr-2 px-2.5 py-1 rounded text-xs`}>
			{translatedStatus}
		</span>
	);
};
