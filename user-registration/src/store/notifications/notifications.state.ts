import { notificationsAdapter } from "./notifications.adapter";

export type NotificationsState = ReturnType<
  (typeof notificationsAdapter)["getInitialState"]
>;
