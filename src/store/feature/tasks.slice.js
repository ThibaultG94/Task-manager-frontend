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
    nextWeekTasks: [],
    isNextWeekTasksLoaded: false,
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
    setSingleTask: (state, action) => {
      state.singleTask = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.isTasksLoaded = true;
    },
    setUrgentTasks: (state, action) => {
      state.urgentTasks = action.payload;
      state.isUrgentTasksLoaded = true;
    },
    setWorkspaceTasks: (state, action) => {
      state.workspaceTasks = action.payload;
      state.isWorkspaceTasksLoaded = true;
    },
    setWorkspaceTaskStatusCount: (state, action) => {
      state.workspaceTaskStatusCount = action.payload;
      state.isWorkspaceTaskStatusCount = true;
    },
    setOverdueTasks: (state, action) => {
      state.overdueTasks = action.payload;
      state.isOverdueTasksLoaded = true;
    },
    setTodayTasks: (state, action) => {
      state.todayTasks = action.payload;
      state.isTodayTasksLoaded = true;
    },
    setTomorrowTasks: (state, action) => {
      state.tomorrowTasks = action.payload;
      state.isTomorrowTasksLoaded = true;
    },
    setThisWeekTasks: (state, action) => {
      state.thisWeekTasks = action.payload;
      state.isThisWeekTasksLoaded = true;
    },
    setNextWeekTasks: (state, action) => {
      state.nextWeekTasks = action.payload;
      state.isNextWeekTasksLoaded = true;
    },
    setThisMonthTasks: (state, action) => {
      state.thisMonthTasks = action.payload;
      state.isThisMonthTasksLoaded = true;
    },
    setNextMonthTasks: (state, action) => {
      state.loading = false;
      state.nextMonthTasks = action.payload;
      state.isNextMonthTasksLoaded = true;
      state.error = null;
    },
    setThisYearTasks: (state, action) => {
      state.thisYearTasks = action.payload;
      state.isThisYearTasksLoaded = true;
    },
    setNextYearTasks: (state, action) => {
      state.nextYearTasks = action.payload;
      state.isNextYearTasksLoaded = true;
    },
    setBecomingTasks: (state, action) => {
      state.becomingTasks = action.payload;
      state.isBecomingTasksLoaded = true;
    },
    setArchivedTasks: (state, action) => {
      state.archivedTasks = action.payload;
      state.isArchivedTasksLoaded = true;
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
  setSingleTask,
  setTasks,
  setUrgentTasks,
  setWorkspaceTasks,
  setWorkspaceTaskStatusCount,
  setOverdueTasks,
  setTodayTasks,
  setTomorrowTasks,
  setThisWeekTasks,
  setNextWeekTasks,
  setThisMonthTasks,
  setNextMonthTasks,
  setThisYearTasks,
  setNextYearTasks,
  setBecomingTasks,
  setArchivedTasks,
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
