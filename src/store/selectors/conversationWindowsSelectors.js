import { createSelector } from "@reduxjs/toolkit";

const selectConversationWindowsState = (state) => state.conversationWindows;

export const selectConversationWindows = createSelector(
  [selectConversationWindowsState],
  (conversationWindows) => conversationWindows.windows
);
