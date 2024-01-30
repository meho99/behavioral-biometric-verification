import { put } from "typed-redux-saga";
import { navigationActions } from "../../navigation/navigation.slice";
import { RouterPaths } from "../../../router/router.paths";

export function* signOutSaga() {
  localStorage.setItem("accessToken", "");
  localStorage.setItem("userEmail", "");
  yield* put(navigationActions.redirect({ path: RouterPaths.Login }));
}
