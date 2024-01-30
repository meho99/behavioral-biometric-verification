import { createEntityAdapter } from "@reduxjs/toolkit";
import { NotificationData, NotificationTypes } from "./notifications.types";

/** priority of notifications based on type(asc) */
const notificationsPriority: NotificationTypes[] = ["success", "error"];

const checkPriority = (notification: NotificationData) =>
  notificationsPriority.indexOf(notification.type);

const sortNotifications = (a: NotificationData, b: NotificationData) =>
  checkPriority(a) > checkPriority(b) ? -1 : a.createdAt > b.createdAt ? -1 : 0;

export const notificationsAdapter = createEntityAdapter<
  NotificationData,
  string
>({
  sortComparer: sortNotifications,
  selectId: (notification) => notification.id,
});
