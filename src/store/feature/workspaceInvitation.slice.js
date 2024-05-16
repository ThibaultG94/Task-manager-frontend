import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  dispatchedWorkspaceInvitations: [],
  receivedWorkspaceInvitations: [],
  loading: false,
  error: null,
};

export const workspaceInvitationsSlice = createSlice({
  name: "workspaceInvitations",
  initialState,
  reducers: {
    setSendOutWorkspaceInvitations: (state, action) => {
      state.dispatchedWorkspaceInvitations = action.payload;
    },
    setReceivedWorkspaceInvitations: (state, action) => {
      state.receivedWorkspaceInvitations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
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
