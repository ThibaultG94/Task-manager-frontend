import { createSelector } from '@reduxjs/toolkit';

const selectInvitationsState = (state) => state.invitations;

export const selectDispathedInvitations = createSelector(
	[selectInvitationsState],
	(invitations) => invitations.dispatchedInvitations
);

export const selectReceivedInvitations = createSelector(
	[selectInvitationsState],
	(invitations) => invitations.receivedInvitations
);
