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
    setUserData: (state) => {
      state.loading = true;
    },
    setUserDataSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    setUserDataFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserContactsAction: (state) => {
      state.isUserContactsLoaded = false;
    },
    setUserContactsSuccess: (state, action) => {
      state.userContacts = action.payload;
      state.isUserContactsLoaded = true;
      state.error = null;
    },
    setUserContactsFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setUserData,
  setUserDataSuccess,
  setUserDataFailed,
  updateUser,
  updateUserSuccess,
  updateUserFailed,
  setUserContactsAction,
  setUserContactsSuccess,
  setUserContactsFailed,
} = usersSlice.actions;
export default usersSlice.reducer;
