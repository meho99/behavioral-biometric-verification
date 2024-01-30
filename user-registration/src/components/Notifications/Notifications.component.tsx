import { Alert, Box, Slide, Snackbar } from "@mui/material";
import { NOTIFICATION_DURATION } from "../../store/notifications/notifications.slice";
import { NotificationsComponentProps } from "./Notification.types";
import { NotificationProgress } from "./Notifications.progress";

export const NotificationsComponent = ({
  children,
  removeNotification,
  currentNotifications,
}: NotificationsComponentProps) => {
  return (
    <>
      <Snackbar
        open={!!currentNotifications.length}
        autoHideDuration={NOTIFICATION_DURATION}
        ClickAwayListenerProps={{ onClickAway: () => {} }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        TransitionComponent={Slide}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {currentNotifications.map((notification) => {
            const handleRemove = () => {
              removeNotification(notification.id);
            };

            return (
              <Alert
                key={notification.id}
                onClose={handleRemove}
                severity={notification.type}
              >
                {notification.message}
                <NotificationProgress {...notification} />
              </Alert>
            );
          })}
        </Box>
      </Snackbar>
      {children}
    </>
  );
};
