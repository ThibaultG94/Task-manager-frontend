import { createSelector } from "@reduxjs/toolkit";

const selectTasksState = (state) => state.tasks;

export const selectTask = createSelector(
  [selectTasksState],
  (tasks) => tasks.task
);

export const selectTasks = createSelector(
  [selectTasksState],
  (tasks) => tasks.singleTasks
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

export const selectNextWeekTasks = createSelector(
  [selectTasksState],
  (tasks) => tasks.nextWeekTasks
);

export const selectIsNextWeekTasksLoaded = createSelector(
  [selectTasksState],
  (tasks) => tasks.isNextWeekTasksLoaded
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

export const selectTotalArchivedTasks = createSelector(
  [selectTasksState],
  (tasks) => tasks.totalArchivedTasks
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
