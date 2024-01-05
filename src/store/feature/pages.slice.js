import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentArchivedPage: 1,
};

const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		setCurrentArchivedPage: (state, action) => {
			state.currentArchivedPage = action.payload;
		},
	},
});

export const { setCurrentArchivedPage } = pagesSlice.actions;

export default pagesSlice.reducer;
