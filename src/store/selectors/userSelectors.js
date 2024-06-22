import { createSelector } from "@reduxjs/toolkit";

const selectUsersState = (state) => state?.users;

export const selectUsers = createSelector(
  [selectUsersState],
  (users) => users.users
);

export const selectCurrentUser = createSelector(
  [selectUsersState],
  (users) => users.currentUser
);

export const selectLoading = createSelector(
  [selectUsersState],
  (users) => users.loading
);

export const selectError = createSelector(
  [selectUsersState],
  (users) => users.error
);

export const selectUserContacts = createSelector(
  [selectUsersState],
  (users) => users.userContacts
);

export const selectUserBlockedContacts = createSelector(
  [selectUsersState],
  (users) => users.userBlockedContacts
);

export const selectIsUserContactsLoaded = createSelector(
  [selectUsersState],
  (users) => users.isUserContactsLoaded
);

export const selectIsUserBlockedContactsLoaded = createSelector(
  [selectUsersState],
  (users) => users.isUserBlockedContactsLoaded
);

export const selectUserId = createSelector(
  [selectUsersState],
  (users) => users?.userId
);
