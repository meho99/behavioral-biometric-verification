import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";
import { notificationsAdapter } from "./notifications.adapter";
import { StoreKeys } from "../store.const";
import { ActionsType } from "../store.types";
import { ErrNotificationPayload } from "./notifications.types";
import { getErrMsg } from "./notification.utils";

export const NOTIFICATION_DURATION = 6 * 1000;

const notificationsSlice = createSlice({
  name: StoreKeys.Notifications,
  initialState: notificationsAdapter.getInitialState(),
  reducers: {
    addErrorNotification: (
      state,
      { payload }: PayloadAction<ErrNotificationPayload>
    ) => {
      let message: string;

      if (typeof payload === "string") {
        message = payload;
      } else {
        message = getErrMsg(payload.e, payload.msg);
      }

      notificationsAdapter.addOne(state, {
        id: uuidV4(),
        message,
        createdAt: new Date(),
        deleteTime: new Date().getTime() + NOTIFICATION_DURATION,
        type: "error",
      });
    },
    addSuccessNotification: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      notificationsAdapter.addOne(state, {
        id: uuidV4(),
        message: action.payload ?? "Success!",
        createdAt: new Date(),
        deleteTime: new Date().getTime() + NOTIFICATION_DURATION,
        type: "success",
      });
    },
    clearNotifications: notificationsAdapter.removeAll,
    removeNotification: notificationsAdapter.removeOne,
  },
});

const { actions: notificationActions, reducer: notificationsReducer } =
  notificationsSlice;

export { notificationActions, notificationsReducer };

export type NotificationActions = ActionsType<typeof notificationActions>;
