import { createSlice } from "@reduxjs/toolkit";

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState: {
    dispatchedInvitations: [],
    receivedInvitations: [],
  },
  reducers: {
    setSendOutInvitations: (state, action) => {
      state.dispatchedInvitations = action.payload;
    },
    setReceivedInvitations: (state, action) => {
      state.receivedInvitations = action.payload;
    },
  },
});

export const { setSendOutInvitations, setReceivedInvitations } =
  invitationsSlice.actions;

export default invitationsSlice.reducer;
