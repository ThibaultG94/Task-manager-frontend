import { createSelector } from '@reduxjs/toolkit';

const selectWorkspacesState = (state) => state.workspaces;

export const selectWorkspaces = createSelector(
	[selectWorkspacesState],
	(workspaces) => workspaces.workspaces
);

export const selectSingleWorkspace = createSelector(
	[selectWorkspacesState],
	(workspaces) => workspaces.singleWorkspace
);

export const selectWorkspacesLoading = createSelector(
	[selectWorkspacesState],
	(workspaces) => workspaces.loading
);

export const selectWorkspacesError = createSelector(
	[selectWorkspacesState],
	(workspaces) => workspaces.error
);