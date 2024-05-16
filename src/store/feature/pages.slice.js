import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  currentArchivedPage: 1,
  currentNotificationsPage: 1,
};

const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setCurrentArchivedPage: (state, action) => {
      state.currentArchivedPage = action.payload;
    },
    setCurrentNotificationsPage: (state, action) => {
      state.currentNotificationsPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { setCurrentArchivedPage, currentNotificationsPage } =
  pagesSlice.actions;

export default pagesSlice.reducer;
