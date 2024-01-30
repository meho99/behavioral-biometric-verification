import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StoreKeys } from "../store.const";
import { MouseEventsState } from "./mouseEvents.state";
import { MousePositionEvent } from "./mouseEvents.types";
import { authActions } from "../auth/auth.slice";
import { ActionsType } from "../store.types";

const initialState = { ...new MouseEventsState() };

const mouseEventsSlice = createSlice({
  name: StoreKeys.MouseEvents,
  initialState,
  reducers: {
    postStroke: (state, _action: PayloadAction<MousePositionEvent[]>) => {
      state.postStroke = "loading";
    },
    postStrokeSuccess: (state) => {
      state.postStroke = "success";
    },
    postStrokeError: (state) => {
      state.postStroke = "error";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.signOut, () => ({
      ...new MouseEventsState(),
    }));
  },
});

const { actions: mouseEventsActions, reducer: mouseEventsReducer } =
  mouseEventsSlice;
export { mouseEventsActions, mouseEventsReducer };

export type MouseEventsActions = ActionsType<typeof mouseEventsActions>;
