import { call, put } from "typed-redux-saga";
import { RouterPaths } from "../../../router/router.paths";
import { navigationActions } from "../../navigation/navigation.slice";
import { notificationActions } from "../../notifications/notifications.slice";
import { AuthActions, authActions } from "../auth.slice";
import { login } from "../../../api/login";

export function* loginSaga({ payload }: AuthActions["login"]) {
  try {
    localStorage.setItem("accessToken", "");

    yield* call(login, {
      email: payload.email,
      password: payload.password,
    });

    // TODO: Remove when backend is ready
    localStorage.setItem("userEmail", payload.email);

    // TODO: Remove when backend is ready
    const accessToken = "fake-access-token";
    localStorage.setItem("accessToken", accessToken);

    yield* put(authActions.loginSuccess(accessToken));
    yield* put(authActions.fetchUser());

    yield* put(navigationActions.redirect({ path: RouterPaths.Home }));
  } catch (e) {
    yield* put(authActions.loginError());

    yield* put(
      notificationActions.addErrorNotification({
        e,
        msg: "Failed to login",
      })
    );
  }
}
