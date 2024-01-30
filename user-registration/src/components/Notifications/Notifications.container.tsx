import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationAdapterSelectors } from "../../store/notifications/notifications.selectors";
import { notificationActions } from "../../store/notifications/notifications.slice";
import { NotificationsContainerProps } from "./Notification.types";
import { NotificationsComponent } from "./Notifications.component";

export const NotificationsContainer = (props: NotificationsContainerProps) => {
  const dispatch = useDispatch();
  const currentNotifications = useSelector(
    notificationAdapterSelectors.selectAll
  );

  const removeNotification = useCallback(
    (notificationId: string) => {
      dispatch(notificationActions.removeNotification(notificationId));
    },
    [dispatch]
  );

  return (
    <NotificationsComponent
      removeNotification={removeNotification}
      currentNotifications={currentNotifications}
      {...props}
    />
  );
};
