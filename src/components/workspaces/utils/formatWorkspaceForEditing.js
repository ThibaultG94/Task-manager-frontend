export async function formatWorkspaceForEditing(workspace) {
	if (!workspace) return null;
	const { workspaceId, ...rest } = workspace;
	return { _id: workspaceId, ...rest };
}
