import { all, delay, put, select } from "typed-redux-saga";
import { notificationAdapterSelectors } from "../notifications.selectors";
import {
  notificationActions,
  NOTIFICATION_DURATION,
} from "../notifications.slice";

export function* removeExpiredNotifications() {
  const notifications = yield* select(notificationAdapterSelectors.selectAll);

  yield* delay(NOTIFICATION_DURATION);

  const expiredNotifications = notifications.filter(
    ({ deleteTime }) => deleteTime <= new Date().getTime()
  );

  yield* all(
    expiredNotifications.map(({ id }) =>
      put(notificationActions.removeNotification(id))
    )
  );
}
