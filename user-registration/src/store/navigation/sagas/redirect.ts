import { BrowserHistory } from "history";
import { call } from "typed-redux-saga";
import { NavigationActions } from "../navigation.slice";

export function* redirectSaga(
  history: BrowserHistory,
  { payload }: NavigationActions["redirect"]
): Generator {
  yield* call(history.push, payload.path as string);

  return;
}
