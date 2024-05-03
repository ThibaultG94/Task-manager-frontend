import { createSlice } from "@reduxjs/toolkit";

export const invitationsSlice = createSlice({
  name: "invitations",
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
      // state.dispatchedInvitations.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    sendInvitationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSendOutInvitationsAction: (state) => {
      state.loading = true;
    },
    setSendOutInvitationsSuccess: (state, action) => {
      state.dispatchedInvitations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSendOutInvitationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setReceivedInvitationsAction: (state) => {
      state.loading = true;
    },
    setReceivedInvitationsSuccess: (state, action) => {
      state.receivedInvitations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setReceivedInvitationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    cancelInvitationAction: (state) => {
      state.loading = true;
    },
    cancelInvitationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    cancelInvitationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    declineInvitationAction: (state) => {
      state.loading = true;
    },
    declineInvitationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    declineInvitationFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  sendInvitationAction,
  sendInvitationSuccess,
  sendInvitationFailure,
  setSendOutInvitationsAction,
  setSendOutInvitationsSuccess,
  setSendOutInvitationsFailure,
  setReceivedInvitationsAction,
  setReceivedInvitationsSuccess,
  setReceivedInvitationsFailure,
  cancelInvitationAction,
  cancelInvitationSuccess,
  cancelInvitationFailure,
  declineInvitationAction,
  declineInvitationSuccess,
  declineInvitationFailure,
} = invitationsSlice.actions;

export default invitationsSlice.reducer;
