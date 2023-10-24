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
	midTermHasBeenUpdated: false,
	longTermHasBeenUpdated: false,
	archivedHasBeenUpdated: false,
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
		setMidTermHasBeenUpdated: (state, action) => {
			state.midTermHasBeenUpdated = action.payload;
		},
		setLongTermHasBeenUpdated: (state, action) => {
			state.longTermHasBeenUpdated = action.payload;
		},
		setArchivedHasBeenUpdated: (state, action) => {
			state.archivedHasBeenUpdated = action.payload;
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
	setHasEdited,
	setHasBeenUpdated,
	setOverdueTasksHasBeenUpdated,
	setTodayTasksHasBeenUpdated,
	setTomorrowTasksHasBeenUpdated,
	setMidTermHasBeenUpdated,
	setLongTermHasBeenUpdated,
	setArchivedHasBeenUpdated,
	setWorkspacesHasBeenUpdated,
	resetEditState,
} = editStateSlice.actions;

export default editStateSlice.reducer;
