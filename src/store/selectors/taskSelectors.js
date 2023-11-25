import { createSelector } from '@reduxjs/toolkit';

const selectTasksState = (state) => state.tasks;

export const selectTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.tasks
);

export const selectIsTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isTasksLoaded
);

export const selectUrgentTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.urgentTasks
);

export const selectIsUrgentTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isUrgentTasksLoaded
);

export const selectWorkspaceTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.workspaceTasks
);

export const selectIsWorkspaceTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isWorkspaceTasksLoaded
);

export const selectWorkspaceTaskStatusCount = createSelector(
	[selectTasksState],
	(tasks) => tasks.workspaceTaskStatusCount
);

export const selectWorkspaceTaskStatusCountLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.workspaceTaskStatusCountLoaded
);

export const selectOverdueTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.overdueTasks
);

export const selectIsOverdueTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isOverdueTasksLoaded
);

export const selectTodayTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.todayTasks
);

export const selectIsTodayTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isTodayTasksLoaded
);

export const selectTomorrowTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.tomorrowTasks
);

export const selectIsTomorrowTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isTomorrowTasksLoaded
);

export const selectThisWeekTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisWeekTasks
);

export const selectIsThisWeekTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isThisWeekTasksLoaded
);

export const selectThisWeekendTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisWeekendTasks
);

export const selectIsThisWeekendTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isThisWeekendTasksLoaded
);

export const selectNextWeekTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextWeekTasks
);

export const selectIsNextWeekTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isNextWeekTasksLoaded
);

export const selectNextWeekendTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextWeekendTasks
);

export const selectIsNextWeekendTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isNextWeekendTasksLoaded
);

export const selectThisMonthTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisMonthTasks
);

export const selectIsThisMonthTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isThisMonthTasksLoaded
);

export const selectNextMonthTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextMonthTasks
);

export const selectIsNextMonthTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isNextMonthTasksLoaded
);

export const selectThisYearTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.thisYearTasks
);

export const selectIsThisYearTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isThisYearTasksLoaded
);

export const selectNextYearTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.nextYearTasks
);

export const selectIsNextYearTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isNextYearTasksLoaded
);

export const selectBecomingTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.becomingTasks
);

export const selectIsBecomingTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isBecomingTasksLoaded
);

export const selectArchivedTasks = createSelector(
	[selectTasksState],
	(tasks) => tasks.archivedTasks
);

export const selectIsArchivedTasksLoaded = createSelector(
	[selectTasksState],
	(tasks) => tasks.isArchivedTasksLoaded
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
