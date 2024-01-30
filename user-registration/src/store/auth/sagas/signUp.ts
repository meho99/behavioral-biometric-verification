import { put } from "typed-redux-saga";
import { RouterPaths } from "../../../router/router.paths";
import { navigationActions } from "../../navigation/navigation.slice";
import { notificationActions } from "../../notifications/notifications.slice";
import { AuthActions, authActions } from "../auth.slice";

export function* signUpSaga({ payload }: AuthActions["signUp"]) {
  try {
    localStorage.setItem("accessToken", "");
    // TODO: Remove when backend is ready
    localStorage.setItem("userEmail", payload.email);

    // TODO: Remove when backend is ready
    const accessToken = "fake-access-token";

    yield* put(authActions.signUpSuccess(accessToken));
    yield* put(authActions.fetchUser());

    localStorage.setItem("accessToken", accessToken);
    yield* put(navigationActions.redirect({ path: RouterPaths.Home }));
  } catch (e) {
    yield* put(authActions.signUpError());

    yield* put(
      notificationActions.addErrorNotification({
        e,
        msg: "Filed to sign up",
      })
    );
  }
}
