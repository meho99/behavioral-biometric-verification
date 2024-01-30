import { put } from "typed-redux-saga";
import { authActions } from "../auth.slice";
import { notificationActions } from "../../notifications/notifications.slice";

// TODO: actual call to backend
export function* fetchUserSaga() {
  try {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      yield* put(authActions.signOut());
      return;
    }

    yield* put(
      authActions.fetchUserSuccess({
        email: userEmail,
        isGameCompleted: false,
      })
    );
  } catch (e) {
    yield* put(authActions.fetchUserError());
    yield* put(
      notificationActions.addErrorNotification({
        e,
        msg: "Failed to fetch user",
      })
    );
  }
}
