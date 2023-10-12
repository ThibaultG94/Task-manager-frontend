export async function formatTaskForEditing(task) {
	if (!task) return null;
	const { date, workspace, taskId, isOverdue, ...rest } = task;
	return { workspaceId: workspace, _id: taskId, ...rest };
}
