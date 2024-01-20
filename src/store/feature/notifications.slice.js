import { createSlice } from '@reduxjs/toolkit';

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState: {
		notifications: [],
		loading: false,
		error: null,
	},
	reducers: {
		setNotificationsAction: (state) => {
			state.loading = true;
		},
		setNotificationsSuccess: (state, action) => {
			state.notifications = action.payload;
			state.loading = false;
			state.error = null;
		},
		setNotificationsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		getNotificationsAction: (state) => {
			state.loading = true;
		},
		getNotificationsSuccess: (state, action) => {
			state.notifications = action.payload;
			state.loading = false;
			state.error = null;
		},
		getNotificationsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	setNotificationsAction,
	setNotificationsSuccess,
	setNotificationsFailure,
	getNotificationsAction,
	getNotificationsSuccess,
	getNotificationsFailure,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
