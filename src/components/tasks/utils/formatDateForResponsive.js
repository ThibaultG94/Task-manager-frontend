export function formatDate(date) {
	const taskDate = new Date(date);
	const currentYear = new Date().getFullYear();
	if (taskDate.getFullYear() === currentYear) {
		return `${taskDate.getDate().toString().padStart(2, '0')}/${(
			taskDate.getMonth() + 1
		)
			.toString()
			.padStart(2, '0')}`;
	} else {
		return `${(taskDate.getMonth() + 1)
			.toString()
			.padStart(2, '0')}/${taskDate.getFullYear().toString().substr(-2)}`;
	}
}
