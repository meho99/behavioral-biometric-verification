import { all, takeEvery } from "typed-redux-saga";
import { notificationActions } from "./notifications.slice";
import { removeExpiredNotifications } from "./sagas/removeExpiredNotifications";

export function* notificationsSaga() {
  yield* all([
    takeEvery(
      [
        notificationActions.addErrorNotification,
        notificationActions.addSuccessNotification,
      ],
      removeExpiredNotifications
    ),
  ]);
}
