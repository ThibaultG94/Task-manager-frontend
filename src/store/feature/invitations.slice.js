import { createSlice } from '@reduxjs/toolkit';

export const invitationsSlice = createSlice({
	name: 'invitations',
	initialState: {
		dispatchedInvitations: [],
		receivedInvitations: [],
		loading: false,
		error: null,
	},
	reducers: {
		sendInvitationAction: (state) => {
			state.loading = true;
		},
		sendInvitationSuccess: (state, action) => {
			state.dispatchedInvitations = action.payload;
			state.loading = false;
		},
		sendInvitationFailure: (state, action) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

export const {
	sendInvitationAction,
	sendInvitationSuccess,
	sendInvitationFailure,
} = invitationsSlice.actions;

export default invitationsSlice.reducer;
