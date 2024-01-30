import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionsType } from "../store.types";
import { NavigatePayload } from "./navigation.types";
import { StoreKeys } from "../store.const";

const initialState = {};

export const navigationSlice = createSlice({
  name: StoreKeys.Navigation,
  initialState,
  reducers: {
    redirect: (_, __: PayloadAction<NavigatePayload>) => {},
  },
});

const { actions: navigationActions } = navigationSlice;

export { navigationActions };

export type NavigationActions = ActionsType<typeof navigationActions>;
