export function convertStatusCount(status, count) {
	let statusFrench;
	let taskWord = count > 1 ? 'tâches' : 'tâche';

	switch (status) {
		case 'Pending':
			statusFrench = 'à faire';
			break;
		case 'In Progress':
			statusFrench = 'en cours';
			break;
		case 'Completed':
			statusFrench = count > 1 ? 'terminées' : 'terminée';
			break;
		case 'Archived':
			statusFrench = count > 1 ? 'archivées' : 'archivée';
			break;
		default:
			return `${count} ${status}`;
	}

	return `${count} ${taskWord} ${statusFrench}`;
}
