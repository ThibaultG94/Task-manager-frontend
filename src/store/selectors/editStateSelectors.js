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

export const selectIsEditingWorkspace = createSelector(
	[selectEditState],
	(editState) => editState.isEditingWorkspace
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

export const selectThisWeekTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.thisWeekTasksHasBeenUpdated
);

export const selectThisWeekendTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.thisWeekendTasksHasBeenUpdated
);

export const selectNextWeekTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.nextWeekTasksHasBeenUpdated
);

export const selectNextWeekendTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.nextWeekendTasksHasBeenUpdated
);

export const selectThisMonthTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.thisMonthTasksHasBeenUpdated
);

export const selectNextMonthTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.nextMonthTasksHasBeenUpdated
);

export const selectThisYearTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.thisYearTasksHasBeenUpdated
);

export const selectNextYearTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.nextYearTasksHasBeenUpdated
);

export const selectBecomingTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.becomingTasksHasBeenUpdated
);

export const selectArchivedTasksHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.archivedTasksHasBeenUpdated
);

export const selectWorkspacesHasBeenUpdated = createSelector(
	[selectEditState],
	(editState) => editState.workspacesHasBeenUpdated
);
