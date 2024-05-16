import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  dispatchedInvitations: [],
  receivedInvitations: [],
};

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    setSendOutInvitations: (state, action) => {
      state.dispatchedInvitations = action.payload;
    },
    setReceivedInvitations: (state, action) => {
      state.receivedInvitations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { setSendOutInvitations, setReceivedInvitations } =
  invitationsSlice.actions;

export default invitationsSlice.reducer;
