import { createSlice } from '@reduxjs/toolkit';

export const workspaceInvitationsSlice = createSlice({
	name: 'workspaceInvitations',
	initialState: {
		dispatchedWorkspaceInvitations: [],
		receivedWorkspaceInvitations: [],
		loading: false,
		error: null,
	},
	reducers: {
		sendWorkspaceInvitationAction: (state) => {
			state.loading = true;
		},
		sendWorkspaceInvitationSuccess: (state, action) => {
			// state.dispatchedWorkspaceInvitations.push(action.payload);
			state.loading = false;
			state.error = null;
		},
		sendWorkspaceInvitationFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		setSendOutWorkspaceInvitationsAction: (state) => {
			state.loading = true;
		},
		setSendOutWorkspaceInvitationsSuccess: (state, action) => {
			state.dispatchedWorkspaceInvitations = action.payload;
			state.loading = false;
			state.error = null;
		},
		setSendOutWorkspaceInvitationsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		setReceivedWorkspaceInvitationsAction: (state) => {
			state.loading = true;
		},
		setReceivedWorkpspaceInvitationsSuccess: (state, action) => {
			state.receivedWorkspaceInvitations = action.payload;
			state.loading = false;
			state.error = null;
		},
		setReceivedWorkspaceInvitationsFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		cancelWorkspaceInvitationAction: (state) => {
			state.loading = true;
		},
		cancelWorkspaceInvitationSuccess: (state) => {
			state.loading = false;
			state.error = null;
		},
		cancelWorkspaceInvitationFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		acceptWorkspaceInvitationAction: (state) => {
			state.loading = true;
		},
		acceptWorkspaceInvitationSuccess: (state) => {
			state.loading = false;
			state.error = null;
		},
		acceptWorkspaceInvitationFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
		declineWorkspaceInvitationAction: (state) => {
			state.loading = true;
		},
		declineWorkspaceInvitationSuccess: (state) => {
			state.loading = false;
			state.error = null;
		},
		declineWorkspaceInvitationFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	sendWorkspaceInvitationAction,
	sendWorkspaceInvitationSuccess,
	sendWorkspaceInvitationFailure,
	setSendOutWorkspaceInvitationsAction,
	setSendOutWorkspaceInvitationsSuccess,
	setSendOutWorkspaceInvitationsFailure,
	setReceivedWorkspaceInvitationsAction,
	setReceivedWorkspaceInvitationsSuccess,
	setReceivedWorkspaceInvitationsFailure,
	cancelWorkspaceInvitationAction,
	cancelWorkspaceInvitationSuccess,
	cancelWorkspaceInvitationFailure,
	acceptWorkspaceInvitationAction,
	acceptWorkspaceInvitationSuccess,
	acceptWorkspaceInvitationFailure,
	declineWorkspaceInvitationAction,
	declineWorkspaceInvitationSuccess,
	declineWorkspaceInvitationFailure,
} = workspaceInvitationsSlice.actions;

export default workspaceInvitationsSlice.reducer;
