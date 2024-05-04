import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUser: null,
    userContacts: [],
    isUserContactsLoaded: false,
    loading: false,
    error: null,
  },
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
});

export const { setUserData, updateUserAction, setUserContacts } =
  usersSlice.actions;
export default usersSlice.reducer;
