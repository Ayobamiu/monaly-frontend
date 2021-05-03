import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "notifications",
  initialState: { list: [], notification: null, notifications: [] },
  reducers: {
    notificationsRequested: (notifications, action) => {
      notifications.loading = true;
    },
    notificationsReceived: (notifications, action) => {
      notifications.list = action.payload;
      notifications.loading = false;
    },

    notificationsRequestFailed: (notifications, action) => {
      notifications.loading = false;
    },
    notificationRequested: (notifications, action) => {
      notifications.loading = true;
    },
    notificationReceived: (notifications, action) => {
      notifications.notification = action.payload;
      notifications.loading = false;
    },
    notificationRequestFailed: (notifications, action) => {
      notifications.loading = false;
    },
    notificationAddStart: (notifications, action) => {
      notifications.loading = true;
      notifications.status = "loading";
    },
    notificationAdded: (notifications, action) => {
      notifications.list.push(action.payload);
      notifications.loading = false;
      notifications.status = "Added successfully";
    },

    notificationAddFailed: (notifications, action) => {
      notifications.loading = false;
      notifications.status = "Failed";
    },
    notificationRemoved: (notifications, action) => {
      notifications.list.pop(
        (notification) => notification._id !== action.payload._id
      );
    },
  },
});

export const {
  notificationAdded,
  notificationsRequested,
  notificationsReceived,
  notificationsRequestFailed,
  notificationRequested,
  notificationReceived,
  notificationRequestFailed,
  notificationAddStart,
  notificationAddFailed,
  notificationRemoved,
} = slice.actions;

export default slice.reducer;

//Action creators
export const loadNotifications = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/notifications",
      // params: params,
      onStart: notificationsRequested.type,
      onSuccess: notificationsReceived.type,
      onError: notificationsRequestFailed.type,
    })
  );
};
