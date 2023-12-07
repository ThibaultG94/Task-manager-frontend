import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEditing: {
		title: false,
		status: false,
		priority: false,
		deadline: false,
		description: false,
		comments: false,
		workspace: false,
		assignedTo: false,
	},
	hasEdited: false,
	hasBeenUpdated: false,
	overdueTasksHasBeenUpdated: false,
	todayTasksHasBeenUpdated: false,
	tomorrowTasksHasBeenUpdated: false,
	thisWeekTasksHasBeenUpdated: false,
	thisWeekendTasksHasBeenUpdated: false,
	nextWeekTasksHasBeenUpdated: false,
	nextWeekendTasksHasBeenUpdated: false,
	thisMonthTasksHasBeenUpdated: false,
	nextMonthTasksHasBeenUpdated: false,
	thisYearTasksHasBeenUpdated: false,
	nextYearTasksHasBeenUpdated: false,
	becomingTasksHasBeenUpdated: false,
	archivedTasksHasBeenUpdated: false,
	workspacesHasBeenUpdated: false,
};

const editStateSlice = createSlice({
	name: 'editState',
	initialState,
	reducers: {
		setEditingField: (state, action) => {
			const { field, value } = action.payload;
			state.isEditing[field] = value;
		},
		setExclusiveEditingField: (state, action) => {
			const fieldToEdit = action.payload;

			Object.keys(state.isEditing).forEach((field) => {
				state.isEditing[field] = false;
			});

			state.isEditing[fieldToEdit] = true;
		},

		setHasEdited: (state, action) => {
			state.hasEdited = action.payload;
		},
		setHasBeenUpdated: (state, action) => {
			state.hasBeenUpdated = action.payload;
		},
		setOverdueTasksHasBeenUpdated: (state, action) => {
			state.overdueTasksHasBeenUpdated = action.payload;
		},
		setTodayTasksHasBeenUpdated: (state, action) => {
			state.todayTasksHasBeenUpdated = action.payload;
		},
		setTomorrowTasksHasBeenUpdated: (state, action) => {
			state.tomorrowTasksHasBeenUpdated = action.payload;
		},
		setThisWeekTasksHasBeenUpdated: (state, action) => {
			state.thisWeekTasksHasBeenUpdated = action.payload;
		},
		setThisWeekendTasksHasBeenUpdated: (state, action) => {
			state.thisWeekendTasksHasBeenUpdated = action.payload;
		},
		setNextWeekTasksHasBeenUpdated: (state, action) => {
			state.nextWeekTasksHasBeenUpdated = action.payload;
		},
		setNextWeekendTasksHasBeenUpdated: (state, action) => {
			state.nextWeekendTasksHasBeenUpdated = action.payload;
		},
		setThisMonthTasksHasBeenUpdated: (state, action) => {
			state.thisMonthTasksHasBeenUpdated = action.payload;
		},
		setNextMonthTasksHasBeenUpdated: (state, action) => {
			state.nextMonthTasksHasBeenUpdated = action.payload;
		},
		setThisYearTasksHasBeenUpdated: (state, action) => {
			state.thisYearTasksHasBeenUpdated = action.payload;
		},
		setNextYearTasksHasBeenUpdated: (state, action) => {
			state.nextYearTasksHasBeenUpdated = action.payload;
		},
		setBecomingTasksHasBeenUpdated: (state, action) => {
			state.becomingTasksHasBeenUpdated = action.payload;
		},
		setArchivedTasksHasBeenUpdated: (state, action) => {
			state.archivedTasksHasBeenUpdated = action.payload;
		},
		setWorkspacesHasBeenUpdated: (state, action) => {
			state.workspacesHasBeenUpdated = action.payload;
		},
		resetEditState: (state) => {
			state.isEditing = {
				title: false,
				status: false,
				priority: false,
				deadline: false,
				description: false,
				comments: false,
				workspace: false,
				assignedTo: false,
			};
			state.hasEdited = false;
		},
	},
});

export const {
	setEditingField,
	setExclusiveEditingField,
	setHasEdited,
	setHasBeenUpdated,
	setOverdueTasksHasBeenUpdated,
	setTodayTasksHasBeenUpdated,
	setTomorrowTasksHasBeenUpdated,
	setThisWeekTasksHasBeenUpdated,
	setThisWeekendTasksHasBeenUpdated,
	setNextWeekTasksHasBeenUpdated,
	setNextWeekendTasksHasBeenUpdated,
	setThisMonthTasksHasBeenUpdated,
	setNextMonthTasksHasBeenUpdated,
	setThisYearTasksHasBeenUpdated,
	setNextYearTasksHasBeenUpdated,
	setBecomingTasksHasBeenUpdated,
	setArchivedTasksHasBeenUpdated,
	setWorkspacesHasBeenUpdated,
	resetEditState,
} = editStateSlice.actions;

export default editStateSlice.reducer;
