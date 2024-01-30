export type NotificationTypes = "error" | "success";

export type NotificationData = {
  type: NotificationTypes;
  message?: string;
  createdAt: Date;
  deleteTime: number;
  id: string;
};

export type ErrNotificationPayload =
  | string
  | {
      e: unknown;
      msg: string;
    };
