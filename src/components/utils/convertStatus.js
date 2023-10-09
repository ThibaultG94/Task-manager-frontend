export async function convertStatus(status) {
	switch (status) {
		case 'Pending':
			return 'À faire';
		case 'In Progress':
			return 'En cours';
		case 'Completed':
			return 'Terminé';
		case 'Archived':
			return 'Archivé';

		default:
			return status;
	}
}
