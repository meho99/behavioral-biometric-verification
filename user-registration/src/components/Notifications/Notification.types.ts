import { ReactNode } from "react";
import { NotificationData } from "../../store/notifications/notifications.types";

export type NotificationsContainerProps = {
  children?: ReactNode;
};

export type NotificationsComponentProps = NotificationsContainerProps & {
  removeNotification: (notificationId: string) => void;
  currentNotifications: NotificationData[];
};

export type NotificationProgressProps = NotificationData;
