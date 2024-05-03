import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    isNotificationsLoaded: false,
    totalNumberOfNotifications: 0,
    newNotifications: [],
    earlierNotifications: [],
    loading: false,
    error: null,
  },
  reducers: {
    setNotificationsAction: (state) => {
      state.loading = true;
    },
    setNotificationsSuccess: (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
      state.error = null;
    },
    setNotificationsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getAllNotificationsSuccess: (state, action) => {
      state.notifications = action.payload.notifications;
      state.totalNumberOfNotifications =
        action.payload.totalNumberOfNotifications;
      state.isNotificationsLoaded = true;
    },
    getNotificationsSuccess: (state, action) => {
      const { newNotifications, earlierNotifications } = action.payload;
      state.newNotifications = newNotifications;
      state.earlierNotifications = earlierNotifications;
    },
    markNotificationsViewedAction: (state) => {
      state.loading = true;
    },
    markNotificationsViewedSuccess: (state, action) => {
      const viewedIds = action.payload;
      state.newNotifications = state.newNotifications.map((notif) =>
        viewedIds.includes(notif._id)
          ? { ...notif, viewedAt: new Date() }
          : notif
      );
      state.loading = false;
      state.error = null;
    },
    markNotificationsViewedFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    markNotificationAsReadAction: (state) => {
      state.loading = true;
    },
    markNotificationAsReadSuccess: (state, action) => {
      const notificationId = action.payload;
      state.newNotifications = state.newNotifications.map((notif) =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      );
      state.earlierNotifications = state.earlierNotifications.map((notif) =>
        notif._id === notificationId ? { ...notif, read: true } : notif
      );
      state.loading = false;
      state.error = null;
    },
    markNotificationAsReadFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setNotificationsAction,
  setNotificationsSuccess,
  setNotificationsFailure,
  getAllNotificationsSuccess,
  getNotificationsSuccess,
  markNotificationsViewedAction,
  markNotificationsViewedSuccess,
  markNotificationsViewedFailure,
  markNotificationAsReadAction,
  markNotificationAsReadSuccess,
  markNotificationAsReadFailure,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
