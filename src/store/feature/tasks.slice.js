import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    singleTask: null,
    tasks: [],
    isTasksLoaded: false,
    urgentTasks: [],
    isUrgentTasksLoaded: false,
    workspaceTasks: [],
    isWorkspaceTasksLoaded: false,
    workspaceTaskStatusCount: [],
    isWorkspaceTaskStatusCount: false,
    overdueTasks: [],
    isOverdueTasksLoaded: false,
    todayTasks: [],
    isTodayTasksLoaded: false,
    tomorrowTasks: [],
    isTomorrowTasksLoaded: false,
    thisWeekTasks: [],
    isThisWeekTasksLoaded: false,
    thisWeekendTasks: [],
    isThisWeekendTasksLoaded: false,
    nextWeekTasks: [],
    isNextWeekTasksLoaded: false,
    nextWeekendTasks: [],
    isNextWeekendTasksLoaded: false,
    thisMonthTasks: [],
    isThisMonthTasksLoaded: false,
    nextMonthTasks: [],
    isNextMonthTasksLoaded: false,
    thisYearTasks: [],
    isThisYearTasksLoaded: false,
    nextYearTasks: [],
    isNextYearTasksLoaded: false,
    becomingTasks: [],
    isBecomingTasksLoaded: false,
    archivedTasks: [],
    isArchivedTasksLoaded: false,
    totalArchivedTasks: 0,
    editedTask: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSingleTaskAction: (state) => {
      state.loading = true;
    },
    setSingleTaskSuccess: (state, action) => {
      state.loading = false;
      state.singleTask = action.payload;
      state.error = null;
    },
    setSingleTaskFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTasksAction: (state) => {
      state.loading = true;
    },
    setTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.isTasksLoaded = true;
      state.error = null;
    },
    setTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUrgentTasksAction: (state) => {
      state.loading = true;
    },
    setUrgentTasksSuccess: (state, action) => {
      state.loading = false;
      state.urgentTasks = action.payload;
      state.isUrgentTasksLoaded = true;
      state.error = null;
    },
    setUrgentTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setWorkspaceTasksAction: (state) => {
      state.loading = true;
    },
    setWorkspaceTasksSuccess: (state, action) => {
      state.loading = false;
      state.workspaceTasks = action.payload;
      state.isWorkspaceTasksLoaded = true;
      state.error = null;
    },
    setWorkspaceTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setWorkspaceTaskStatusCountAction: (state) => {
      state.loading = true;
    },
    setWorkspaceTaskStatusCountSuccess: (state, action) => {
      state.loading = false;
      state.workspaceTaskStatusCount = action.payload;
      state.isWorkspaceTaskStatusCount = true;
      state.error = null;
    },
    setWorkspaceTaskStatusCountFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setOverdueTasksAction: (state) => {
      state.loading = true;
    },
    setOverdueTasksSuccess: (state, action) => {
      state.loading = false;
      state.overdueTasks = action.payload;
      state.isOverdueTasksLoaded = true;
      state.error = null;
    },
    setOverdueTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTodayTasksAction: (state) => {
      state.loading = true;
    },
    setTodayTasksSuccess: (state, action) => {
      state.loading = false;
      state.todayTasks = action.payload;
      state.isTodayTasksLoaded = true;
      state.error = null;
    },
    setTodayTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTomorrowTasksAction: (state) => {
      state.loading = true;
    },
    setTomorrowTasksSuccess: (state, action) => {
      state.loading = false;
      state.tomorrowTasks = action.payload;
      state.isTomorrowTasksLoaded = true;
      state.error = null;
    },
    setTomorrowTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setThisWeekTasksAction: (state) => {
      state.loading = true;
    },
    setThisWeekTasksSuccess: (state, action) => {
      state.loading = false;
      state.thisWeekTasks = action.payload;
      state.isThisWeekTasksLoaded = true;
      state.error = null;
    },
    setThisWeekTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setThisWeekendTasksAction: (state) => {
      state.loading = true;
    },
    setThisWeekendTasksSuccess: (state, action) => {
      state.loading = false;
      state.thisWeekendTasks = action.payload;
      state.isThisWeekendTasksLoaded = true;
      state.error = null;
    },
    setThisWeekendTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setNextWeekTasksAction: (state) => {
      state.loading = true;
    },
    setNextWeekTasksSuccess: (state, action) => {
      state.loading = false;
      state.nextWeekTasks = action.payload;
      state.isNextWeekTasksLoaded = true;
      state.error = null;
    },
    setNextWeekTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setNextWeekendTasksAction: (state) => {
      state.loading = true;
    },
    setNextWeekendTasksSuccess: (state, action) => {
      state.loading = false;
      state.nextWeekendTasks = action.payload;
      state.isNextWeekendTasksLoaded = true;
      state.error = null;
    },
    setNextWeekendTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setThisMonthTasksAction: (state) => {
      state.loading = true;
    },
    setThisMonthTasksSuccess: (state, action) => {
      state.loading = false;
      state.thisMonthTasks = action.payload;
      state.isThisMonthTasksLoaded = true;
      state.error = null;
    },
    setThisMonthTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setNextMonthTasksAction: (state) => {
      state.loading = true;
    },
    setNextMonthTasksSuccess: (state, action) => {
      state.loading = false;
      state.nextMonthTasks = action.payload;
      state.isNextMonthTasksLoaded = true;
      state.error = null;
    },
    setNextMonthTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setThisYearTasksAction: (state) => {
      state.loading = true;
    },
    setThisYearTasksSuccess: (state, action) => {
      state.loading = false;
      state.thisYearTasks = action.payload;
      state.isThisYearTasksLoaded = true;
      state.error = null;
    },
    setThisYearTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setNextYearTasksAction: (state) => {
      state.loading = true;
    },
    setNextYearTasksSuccess: (state, action) => {
      state.loading = false;
      state.nextYearTasks = action.payload;
      state.isNextYearTasksLoaded = true;
      state.error = null;
    },
    setNextYearTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setBecomingTasksAction: (state) => {
      state.loading = true;
    },
    setBecomingTasksSuccess: (state, action) => {
      state.loading = false;
      state.becomingTasks = action.payload;
      state.isBecomingTasksLoaded = true;
      state.error = null;
    },
    setBecomingTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setArchivedTasksAction: (state) => {
      state.loading = true;
    },
    setArchivedTasksSuccess: (state, action) => {
      state.loading = false;
      state.archivedTasks = action.payload;
      state.isArchivedTasksLoaded = true;
      state.error = null;
    },
    setArchivedTasksFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTaskAction: (state) => {
      state.loading = true;
    },
    createTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
      state.error = null;
    },
    createTaskFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editTaskAction: (state) => {
      state.loading = true;
    },
    editTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.map((task) => {
        if (task._id === action.payload._id) {
          return {
            ...task,
            title: action.payload.title,
            userId: action.payload.userId,
            description: action.payload.description,
            status: action.payload.status,
            priority: action.payload.priority,
            workspaceId: action.payload.workspaceId,
            deadline: action.payload.deadline,
            comments: action.payload.comments,
            assignedTo: action.payload.assignedTo,
            archiveDate: action.payload.archiveDate,
          };
        } else {
          return task;
        }
      });
      state.error = null;
    },
    editTaskFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskAction: (state) => {
      state.loading = true;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      state.error = null;
    },
    deleteTaskFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTotalArchivedTasks: (state, action) => {
      state.totalArchivedTasks = action.payload;
    },
    setInitialEditedTask: (state, action) => {
      state.editedTask = action.payload;
    },
    setEditedTask: (state, action) => {
      state.editedTask = action.payload;
    },
    updateEditedTask: (state, action) => {
      state.editedTask = {
        ...state.editedTask,
        ...action.payload,
      };
    },
    clearEditedTask: (state) => {
      state.editedTask = null;
    },
  },
});

export const {
  setSingleTaskAction,
  setSingleTaskSuccess,
  setSingleTaskFailed,
  setTasksAction,
  setTasksSuccess,
  setTasksFailed,
  setUrgentTasksAction,
  setUrgentTasksSuccess,
  setUrgentTasksFailed,
  setWorkspaceTasksAction,
  setWorkspaceTasksSuccess,
  setWorkspaceTasksFailed,
  setWorkspaceTaskStatusCountAction,
  setWorkspaceTaskStatusCountSuccess,
  setWorkspaceTaskStatusCountFailed,
  setOverdueTasksAction,
  setOverdueTasksSuccess,
  setOverdueTasksFailed,
  setTodayTasksAction,
  setTodayTasksSuccess,
  setTodayTasksFailed,
  setTomorrowTasksAction,
  setTomorrowTasksSuccess,
  setTomorrowTasksFailed,
  setThisWeekTasksAction,
  setThisWeekTasksSuccess,
  setThisWeekTasksFailed,
  setThisWeekendTasksAction,
  setThisWeekendTasksSuccess,
  setThisWeekendTasksFailed,
  setNextWeekTasksAction,
  setNextWeekTasksSuccess,
  setNextWeekTasksFailed,
  setNextWeekendTasksAction,
  setNextWeekendTasksSuccess,
  setNextWeekendTasksFailed,
  setThisMonthTasksAction,
  setThisMonthTasksSuccess,
  setThisMonthTasksFailed,
  setNextMonthTasksAction,
  setNextMonthTasksSuccess,
  setNextMonthTasksFailed,
  setThisYearTasksAction,
  setThisYearTasksSuccess,
  setThisYearTasksFailed,
  setNextYearTasksAction,
  setNextYearTasksSuccess,
  setNextYearTasksFailed,
  setBecomingTasksAction,
  setBecomingTasksSuccess,
  setBecomingTasksFailed,
  setArchivedTasksAction,
  setArchivedTasksSuccess,
  setArchivedTasksFailed,
  createTaskAction,
  createTaskSuccess,
  createTaskFailed,
  editTaskAction,
  editTaskSuccess,
  editTaskFailed,
  deleteTaskAction,
  deleteTaskSuccess,
  deleteTaskFailed,
  setTotalArchivedTasks,
  setInitialEditedTask,
  setEditedTask,
  updateEditedTask,
  clearEditedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
