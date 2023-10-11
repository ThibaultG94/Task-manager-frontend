import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state) => state.users;

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
