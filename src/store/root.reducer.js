import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./feature/users.slice";
import tasksSlice from "./feature/tasks.slice";
import workspacesSlice from "./feature/workspaces.slice";
import editStateSlice from "./feature/editState.slice";
import tipsSlice from "./feature/tips.slice";
import pagesSlice from "./feature/pages.slice";
import invitationsSlice from "./feature/invitations.slice";
import notificationsSlice from "./feature/notifications.slice";
import workspaceInvitationsSlice from "./feature/workspaceInvitation.slice";
import commentsSlice from "./feature/comments.slice";
import conversationWindowsSlice from "./feature/conversationWindows.slice";
import { resetStore } from "./actions/reset.actions";

const appReducer = combineReducers({
  users: usersSlice,
  tasks: tasksSlice,
  workspaces: workspacesSlice,
  editState: editStateSlice,
  tips: tipsSlice,
  pages: pagesSlice,
  invitations: invitationsSlice,
  workspaceInvitations: workspaceInvitationsSlice,
  notifications: notificationsSlice,
  comments: commentsSlice,
  conversationWindows: conversationWindowsSlice,
});

const rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
