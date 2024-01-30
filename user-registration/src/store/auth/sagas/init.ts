import { put } from "typed-redux-saga";
import { authActions } from "../auth.slice";

export function* initSaga() {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    yield* put(authActions.signOut());
    return;
  }

  yield* put(authActions.setAccessToken(accessToken));
  yield* put(authActions.fetchUser());
}
