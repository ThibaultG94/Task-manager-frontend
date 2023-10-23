export async function sortTasks(tasks) {
	const priorityValues = {
		Urgent: 4,
		High: 3,
		Medium: 2,
		Low: 1,
	};

	return tasks.sort((a, b) => {
		if (new Date(a.deadline).getTime() === new Date(b.deadline).getTime()) {
			return priorityValues[b.priority] - priorityValues[a.priority];
		}
		return new Date(a.deadline) - new Date(b.deadline);
	});
}
