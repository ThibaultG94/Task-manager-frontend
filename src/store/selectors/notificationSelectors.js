import { createSelector } from '@reduxjs/toolkit';

const selectNotificationsState = (state) => state.notifications.notifications;

export const selectNotifications = createSelector(
	[selectNotificationsState],
	(notifications) => notifications.notifications
);
