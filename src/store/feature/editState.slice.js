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
	hasBeenSaved: false,
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
		setHasBeenSaved: (state, action) => {
			state.hasBeenSaved = action.payload;
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
	setHasBeenSaved,
	resetEditState,
} = editStateSlice.actions;

export default editStateSlice.reducer;
