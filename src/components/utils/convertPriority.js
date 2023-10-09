export async function convertPriority(priority) {
	switch (priority) {
		case 'Low':
			return 'Priorité faible';
		case 'Medium':
			return 'Priorité moyenne';
		case 'High':
			return 'Priorité haute';
		case 'Urgent':
			return 'Urgent';

		default:
			return priority;
	}
}
