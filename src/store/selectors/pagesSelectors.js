import { createSelector } from '@reduxjs/toolkit';

const selectPagesState = (state) => state.pages;

export const selectCurrentArchivedPage = createSelector(
	[selectPagesState],
	(pages) => pages.currentArchivedPage
);

export const selectCurrentNotificationsPage = createSelector(
	[selectPagesState],
	(pages) => pages.currentNotificationsPage
);
