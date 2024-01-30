import { BrowserHistory } from "history";
import { all, takeEvery } from "typed-redux-saga";
import { navigationActions } from "./navigation.slice";
import { redirectSaga } from "./sagas/redirect";

export function* navigationSaga(history: BrowserHistory) {
  yield* all([takeEvery(navigationActions.redirect, redirectSaga, history)]);
}
