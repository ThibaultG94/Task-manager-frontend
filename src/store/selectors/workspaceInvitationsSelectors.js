import { createSelector } from '@reduxjs/toolkit';

const selectWorkspaceInvitationsState = (state) => state.workspaceInvitations;

export const selectDispathedWorkspaceInvitations = createSelector(
	[selectWorkspaceInvitationsState],
	(workspaceInvitations) =>
		workspaceInvitations.dispatchedWorkspaceInvitations
);

export const selectReceivedWorkspaceInvitations = createSelector(
	[selectWorkspaceInvitationsState],
	(workspaceInvitations) => workspaceInvitations.receivedWorkspaceInvitations
);
