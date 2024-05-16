import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  currentUser: null,
  userContacts: [],
  isUserContactsLoaded: false,
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserAction: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserContacts: (state, action) => {
      state.userContacts = action.payload;
      state.isUserContactsLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { setUserData, updateUserAction, setUserContacts } =
  usersSlice.actions;
export default usersSlice.reducer;
