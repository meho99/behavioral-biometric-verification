import { Tuple, configureStore } from "@reduxjs/toolkit";
import { BrowserHistory, createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "typed-redux-saga";
import { authSaga } from "./auth/auth.masterSaga";
import { navigationSaga } from "./navigation/navigation.masterSaga";
import { StoreKeys } from "./store.const";
import { authReducer } from "./auth/auth.slice";
import { notificationsReducer } from "./notifications/notifications.slice";
import { notificationsSaga } from "./notifications/notifications.masterSaga";
import { gameReducer } from "./game/game.slice";
import { mouseEventsReducer } from "./mouseEvents/mouseEvents.slice";
import { mouseEventsSaga } from "./mouseEvents/mouseEvents.masterSaga";

export const rootReducer = {
  [StoreKeys.Auth]: authReducer,
  [StoreKeys.Notifications]: notificationsReducer,
  [StoreKeys.Game]: gameReducer,
  [StoreKeys.MouseEvents]: mouseEventsReducer,
};

function* indexSaga(history: BrowserHistory) {
  yield* all([
    fork(navigationSaga, history),
    fork(authSaga),
    fork(notificationsSaga),
    fork(mouseEventsSaga),
  ]);
}

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

export const getStore = (rootSaga = indexSaga, reducer = rootReducer) => {
  const store = configureStore({
    reducer,
    middleware: () => new Tuple(sagaMiddleware),
  });

  sagaMiddleware.run(rootSaga, history);

  return store;
};

export const store = getStore();

export type RootState = ReturnType<typeof store.getState>;
