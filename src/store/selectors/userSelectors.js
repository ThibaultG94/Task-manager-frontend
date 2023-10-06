import { createSelector } from '@reduxjs/toolkit';

const selectUsers = (state) => state.users;

export const selectCurrentUser = createSelector(
	[selectUsers],
	(users) => users.currentUser
);

export const selectLoading = createSelector(
	[selectUsers],
	(users) => users.loading
);

export const selectError = createSelector(
	[selectUsers],
	(users) => users.error
);
