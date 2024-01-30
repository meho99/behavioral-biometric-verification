import { createSelector } from "@reduxjs/toolkit";
import { notificationsAdapter } from "./notifications.adapter";
import { NotificationData } from "./notifications.types";
import { RootState } from "../store.config";

const selectNotifications = (state: RootState) => state.notifications;

export const notificationAdapterSelectors =
  notificationsAdapter.getSelectors(selectNotifications);

/** returns most important notification(list is sorted due to 'sortCompare' function in notificationsAdapter) */
export const getNotificationSelector = createSelector(
  [notificationAdapterSelectors.selectAll],
  (notifications): NotificationData | undefined => notifications[0]
);
