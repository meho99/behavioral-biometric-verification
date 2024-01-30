import { all, takeEvery } from "typed-redux-saga";
import { mouseEventsActions } from "./mouseEvents.slice";
import { postStrokeSaga } from "./sagas/postStroke";

export function* mouseEventsSaga() {
  yield* all([takeEvery(mouseEventsActions.postStroke, postStrokeSaga)]);
}
