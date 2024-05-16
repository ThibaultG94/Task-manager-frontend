import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  tips: [],
  loading: false,
  error: null,
};

export const tipsSlice = createSlice({
  name: "tips",
  initialState,
  reducers: {
    getTipsAction: (state, action) => {
      state.tips = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { getTipsAction } = tipsSlice.actions;
export default tipsSlice.reducer;
