export async function convertPriority(priority) {
	switch (priority) {
		case 'Low':
			return 'Faible';
		case 'Medium':
			return 'Moyenne';
		case 'High':
			return 'Haute';
		case 'Urgent':
			return 'Urgent';

		default:
			return priority;
	}
}
