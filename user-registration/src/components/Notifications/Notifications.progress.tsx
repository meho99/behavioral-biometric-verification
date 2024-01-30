import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { NOTIFICATION_DURATION } from "../../store/notifications/notifications.slice";
import { NotificationProgressProps } from "./Notification.types";

export const NotificationProgress = (
  currentNotification: NotificationProgressProps
) => {
  const [timePercentage, setTimePercentage] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime =
        currentNotification.deleteTime - new Date().getTime();

      const newPercentage = (remainingTime / NOTIFICATION_DURATION) * 100;

      setTimePercentage(newPercentage);
    }, 10);

    return () => clearInterval(interval);
  }, [currentNotification]);

  return (
    <LinearProgress
      variant="determinate"
      color={currentNotification.type}
      value={timePercentage}
    />
  );
};
