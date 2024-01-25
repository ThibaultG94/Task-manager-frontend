import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentArchivedPage: 1,
	currentNotificationsPage: 1,
};

const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		setCurrentArchivedPage: (state, action) => {
			state.currentArchivedPage = action.payload;
		},
		setCurrentNotificationsPage: (state, action) => {
			state.currentNotificationsPage = action.payload;
		},
	},
});

export const { setCurrentArchivedPage, currentNotificationsPage } =
	pagesSlice.actions;

export default pagesSlice.reducer;
