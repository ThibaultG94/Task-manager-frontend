import { useEffect, useState } from 'react';
import { convertStatus } from '../utils/convertStatus';

export const TaskStatusCount = ({ status, count }) => {
	const [translatedStatus, setTranslatedStatus] = useState(null);

	useEffect(() => {
		const translateStatus = async () => {
			const translatedStatus = await convertStatus(status);
			setTranslatedStatus(translatedStatus);
		};
		translateStatus();
	}, [status]);

	return (
		<span
			className={`bg-status-${status.toLowerCase()} mr-2 px-2.5 py-1 rounded text-xs`}>
			{count} {count > 1 ? 'tâches' : 'tâche'}{' '}
			{translatedStatus && translatedStatus}
		</span>
	);
};
