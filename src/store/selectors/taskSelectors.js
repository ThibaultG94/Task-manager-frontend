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

export const selectThisWeekTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisWeekTasks
);

export const selectThisWeekendTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisWeekendTasks
);

export const selectNextWeekTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextWeekTasks
);

export const selectNextWeekendTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextWeekendTasks
);

export const selectThisMonthTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisMonthTasks
);

export const selectThisYearTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisYearTasks
);

export const selectNextYearTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextYearTasks
);

export const selectBecomingTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.becomingTasks
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
