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
    setReceivedInvitations: (state, action) => {
      state.receivedInvitations = action.payload;
      state.loading = false;
      state.error = null;
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
  setReceivedInvitations,
} = invitationsSlice.actions;

export default invitationsSlice.reducer;
