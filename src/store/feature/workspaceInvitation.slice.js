import { createSlice } from "@reduxjs/toolkit";

export const workspaceInvitationsSlice = createSlice({
  name: "workspaceInvitations",
  initialState: {
    dispatchedWorkspaceInvitations: [],
    receivedWorkspaceInvitations: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSendOutWorkspaceInvitations: (state, action) => {
      state.dispatchedWorkspaceInvitations = action.payload;
    },
    setReceivedWorkspaceInvitations: (state, action) => {
      state.receivedWorkspaceInvitations = action.payload;
    },
  },
});

export const {
  setSendOutWorkspaceInvitations,
  setReceivedWorkspaceInvitations,
  declineWorkspaceInvitationAction,
  declineWorkspaceInvitationSuccess,
  declineWorkspaceInvitationFailure,
} = workspaceInvitationsSlice.actions;

export default workspaceInvitationsSlice.reducer;
