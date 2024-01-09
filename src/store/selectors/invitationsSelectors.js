import { createSelector } from '@reduxjs/toolkit';

const selectInvitationsState = (state) => state.invitations;

export const selectDispathedInvitations = createSelector(
	[selectInvitationsState],
	(invitations) => invitations.dispatchedInvitations
);
