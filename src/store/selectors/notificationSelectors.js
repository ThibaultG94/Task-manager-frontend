import { createSelector } from "@reduxjs/toolkit";

const selectNotificationsState = (state) => state.notifications;

export const selectNotifications = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.notifications
);

export const selectTotalNumberOfNotifications = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.totalNumberOfNotifications
);

export const selectIsNotificationsLoaded = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.isNotificationsLoaded
);

export const selectNewNotifications = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.newNotifications
);

export const selectEarlierNotifications = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.earlierNotifications
);
