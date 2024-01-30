import { all, fork, takeLatest } from "typed-redux-saga";
import { authActions } from "./auth.slice";
import { signUpSaga } from "./sagas/signUp";
import { fetchUserSaga } from "./sagas/fetchUser";
import { signOutSaga } from "./sagas/signOut";
import { initSaga } from "./sagas/init";
import { loginSaga } from "./sagas/login";

export function* authSaga() {
  yield* all([
    fork(initSaga),
    takeLatest(authActions.login, loginSaga),
    takeLatest(authActions.signUp, signUpSaga),
    takeLatest(authActions.fetchUser, fetchUserSaga),
    takeLatest(authActions.signOut, signOutSaga),
  ]);
}
