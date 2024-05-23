import { createSlice } from "@reduxjs/toolkit";
import { resetStore } from "../actions/reset.actions";

const initialState = {
  windows: [],
};

const conversationWindowsSlice = createSlice({
  name: "conversationWindows",
  initialState,
  reducers: {
    openWindow: (state, action) => {
      const { contact } = action.payload;
      const existingWindow = state.windows.find(
        (window) => window.contact.id === contact.id
      );
      if (!existingWindow) {
        state.windows.push({ contact, isOpen: true, isMinimized: false });
      } else if (existingWindow.isMinimized) {
        existingWindow.isMinimized = false;
      }
    },
    closeWindow: (state, action) => {
      const { contactId } = action.payload;
      state.windows = state.windows.filter(
        (window) => window.contact.id !== contactId
      );
    },
    minimizeWindow: (state, action) => {
      const { contactId } = action.payload;
      const window = state.windows.find(
        (window) => window.contact.id === contactId
      );
      if (window) {
        window.isMinimized = !window.isMinimized;
      }
    },
    toggleWindow: (state, action) => {
      const { contact } = action.payload;
      const existingWindow = state.windows.find(
        (window) => window.contact.id === contact.id
      );
      if (!existingWindow) {
        state.windows.push({ contact, isOpen: true, isMinimized: false });
      } else {
        existingWindow.isMinimized = !existingWindow.isMinimized;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetStore, () => initialState);
  },
});

export const { openWindow, closeWindow, minimizeWindow, toggleWindow } =
  conversationWindowsSlice.actions;

export default conversationWindowsSlice.reducer;
