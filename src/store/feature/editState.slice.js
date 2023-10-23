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
	resetEditState,
} = editStateSlice.actions;

export default editStateSlice.reducer;
