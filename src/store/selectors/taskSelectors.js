import { createSelector } from '@reduxjs/toolkit';

const selectTasksState = (state) => state.tasks;

export const selectTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.tasks
);

export const selectUrgentTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.urgentTasks
);

export const selectSingleTask = createSelector(
	[selectTasksState],
	(tasks) => tasks.singleTask
);

export const selectShortTermTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.shortTermTasks
);

export const selectOverdueTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.overdueTasks
);

export const selectTodayTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.todayTasks
);

export const selectTomorrowTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.tomorrowTasks
);

export const selectMidTermTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.midTermTasks
);

export const selectLongTermTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.longTermTasks
);

export const selectArchivedTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.archivedTasks
);

export const selectTasksLoading = createSelector(
	[selectTasksState],
	(tasks) => tasks.loading
);

export const selectTasksError = createSelector(
	[selectTasksState],
	(tasks) => tasks.error
);

export const selectEditedTask = createSelector(
	[selectTasksState],
	(tasks) => tasks.editedTask
);
