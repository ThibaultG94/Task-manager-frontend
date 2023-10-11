import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isEditing: false,
	hasEdited: false,
};

const editStateSlice = createSlice({
	name: 'editState',
	initialState,
	reducers: {
		setEditing: (state, action) => {
			state.isEditing = action.payload;
		},
		setHasEdited: (state, action) => {
			state.hasEdited = action.payload;
		},
		resetEditState: (state) => {
			state.isEditing = false;
			state.hasEdited = false;
		},
	},
});

export const { setEditing, setHasEdited, resetEditState } =
	editStateSlice.actions;

export default editStateSlice.reducer;
