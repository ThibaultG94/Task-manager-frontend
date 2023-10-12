import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		tasks: [],
		urgentTasks: [],
		singleTask: null,
		shortTermTasks: [],
		midTermTasks: [],
		longTermTasks: [],
		archivedTasks: [],
		editedTask: null,
		loading: false,
		error: null,
	},
	reducers: {
		setTasks: (state) => {
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
		setShortTermTasks: (state) => {
			state.loading = true;
		},
		setShortTermTasksSuccess: (state, action) => {
			state.loading = false;
			state.shortTermTasks = action.payload;
			state.error = null;
		},
		setShortTermTasksFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setMidTermTasks: (state) => {
			state.loading = true;
		},
		setMidTermTasksSuccess: (state, action) => {
			state.loading = false;
			state.midTermTasks = action.payload;
			state.error = null;
		},
		setMidTermTasksFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setLongTermTasks: (state) => {
			state.loading = true;
		},
		setLongTermTasksSuccess: (state, action) => {
			state.loading = false;
			state.longTermTasks = action.payload;
			state.error = null;
		},
		setLongTermTasksFailed: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
		setArchivedTasks: (state) => {
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
	setTasks,
	setTasksSuccess,
	setTasksFailed,
	setUrgentTasks,
	setUrgentTasksSuccess,
	setUrgentTasksFailed,
	setTask,
	setTaskSuccess,
	setTaskFailed,
	setShortTermTasks,
	setShortTermTasksSuccess,
	setShortTermTasksFailed,
	setMidTermTasks,
	setMidTermTasksSuccess,
	setMidTermTasksFailed,
	setLongTermTasks,
	setLongTermTasksSuccess,
	setLongTermTasksFailed,
	setArchivedTasks,
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
