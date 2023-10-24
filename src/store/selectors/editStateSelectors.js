import { createSelector } from '@reduxjs/toolkit';

const selectEditState = (state) => state.editState;

export const selectIsEditing = createSelector(
	[selectEditState],
	(editState) => editState.isEditing
);

export const selectIsEditingField = createSelector(
	[selectEditState],
	(editState) => editState.isEditing
);

export const selectHasEdited = createSelector(
	[selectEditState],
	(editState) => editState.hasEdited
);

export const selectHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.hasBeenUpdated
);

export const selectOverdueTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.overdueTasksHasBeenUpdated
);

export const selectTodayTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.todayTasksHasBeenUpdated
);

export const selectTomorrowTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.tomorrowTasksHasBeenUpdated
);

export const selectMidTermHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.midTermHasBeenUpdated
);

export const selectLongTermHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.longTermHasBeenUpdated
);

export const selectArchivedHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.archivedHasBeenUpdated
);

export const selectWorkspacesHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.workspacesHasBeenUpdated
);
