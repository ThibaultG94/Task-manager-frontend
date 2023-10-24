import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasks: [],
		urgentTasks: [],
		singleTask: null,
		overdueTasks: [],
		todayTasks: [],
		tomorrowTasks: [],
		thisWeekTasks: [],
		thisWeekendTasks: [],
		nextWeekTasks: [],
		nextWeekendTasks: [],
		thisMonthTasks: [],
		thisYearTasks: [],
		nextYearTasks: [],
		becomingTasks: [],
		archivedTasks: [],
		editedTask: null,
		loading: false,
		error: null,
	},
	reducers: {
		setTasksAction: (state) => {
			state.loading = true;
		},
		setTasksSuccess: (state, action) => {
			state.loading = false;
			state.tasks = action.payload;
			state.error = null;
		},
		setTasksFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setUrgentTasks: (state) => {
			state.loading = true;
		},
		setUrgentTasksSuccess: (state, action) => {
			state.loading = false;
			state.urgentTasks = action.payload;
			state.error = null;
		},
		setUrgentTasksFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setTask: (state) => {
			state.loading = true;
		},
		setTaskSuccess: (state, action) => {
			state.loading = false;
			state.singleTask = action.payload;
			state.error = null;
		},
		setTaskFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setOverdueTasksAction: (state) => {
			state.loading = true;
		},
		setOverdueTasksSuccess: (state, action) => {
			state.loading = false;
			state.overdueTasks = action.payload;
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
			state.error = null;
		},
		setThisMonthTasksFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setThisYearTasksAction: (state) => {
			state.loading = true;
		},
		setThisYearTasksSuccess: (state, action) => {
			state.loading = false;
			state.thisYearTasks = action.payload;
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
			state.tasks = state.tasks.filter(
				(task) => task.id !== action.payload
			);
			state.error = null;
		},
		deleteTaskFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
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
	setTasksAction,
	setTasksSuccess,
	setTasksFailed,
	setUrgentTasks,
	setUrgentTasksSuccess,
	setUrgentTasksFailed,
	setTask,
	setTaskSuccess,
	setTaskFailed,
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
	setInitialEditedTask,
	setEditedTask,
	updateEditedTask,
	clearEditedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
