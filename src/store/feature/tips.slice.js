import { createSlice } from "@reduxjs/toolkit";

export const tipsSlice = createSlice({
  name: "tips",
  initialState: {
    tips: [],
    loading: false,
    error: null,
  },
  reducers: {
    getTipsAction: (state, action) => {
      state.tips = action.payload;
    },
  },
});

export const { getTipsAction } = tipsSlice.actions;
export default tipsSlice.reducer;
