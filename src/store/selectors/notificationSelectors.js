import { createSelector } from '@reduxjs/toolkit';

const selectNotificationsState = (state) => state.notifications;

export const selectNotifications = createSelector(
	[selectNotificationsState],
	(notifications) => notifications.notifications
);

export const selectNewNotifications = createSelector(
	[selectNotificationsState],
	(notifications) => notifications.newNotifications
);

export const selectEarlierNotifications = createSelector(
	[selectNotificationsState],
	(notifications) => notifications.earlierNotifications
);
