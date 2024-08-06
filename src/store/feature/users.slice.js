import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  currentUser: null,
  userId: null,
  userContacts: [],
  userBlockedContacts: [],
  checkAvatar: false,
  isUserContactsLoaded: false,
  isUserBlockedContactsLoaded: false,
  isUserLoggedIn: false,
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
    setUserBlockedContacts: (state, action) => {
      state.userBlockedContacts = action.payload;
      state.isUserBlockedContactsLoaded = true;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setCheckAvatar: (state, action) => {
      state.checkAvatar = action.payload;
    },
    setIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const {
  setUserData,
  updateUserAction,
  setUserContacts,
  setUserBlockedContacts,
  setUserId,
  setCheckAvatar,
  setIsUserLoggedIn,
} = usersSlice.actions;
export default usersSlice.reducer;
