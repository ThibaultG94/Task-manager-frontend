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
    setSendOutInvitations: (state, action) => {
      state.dispatchedInvitations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setReceivedInvitations: (state, action) => {
      state.receivedInvitations = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setSendOutInvitations, setReceivedInvitations } =
  invitationsSlice.actions;

export default invitationsSlice.reducer;
