import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActionsType } from "../store.types";
import { StoreKeys } from "../store.const";
import { GameState } from "./game.state";
import { authActions } from "../auth/auth.slice";
import { RoundStep, SelectBlockPayload } from "./game.types";
import { GAME_COLORS, ROUNDS_COUNT } from "./game.const";
import { shuffle } from "./game.utils";

const initialState = { ...new GameState() };

export const gameSlice = createSlice({
  name: StoreKeys.Auth,
  initialState,
  reducers: {
    startNextRound: (state) => {
      state.round += 1;
      state.roundStep = RoundStep.OrderPresentation;
      state.order = shuffle([...GAME_COLORS]);
      state.clickedBlocksCount = 0;
    },
    startOrderSelection: (state) => {
      state.roundStep = RoundStep.OrderSelection;
    },
    selectBlock: (state, { payload }: PayloadAction<SelectBlockPayload>) => {
      const index = state.clickedBlocksCount;
      state.clickedBlocksCount = index + 1;

      if (payload.color === state.order[index]) {
        state.score += 1;
      }

      // last block clicked
      if (index === state.order.length - 1) {
        if (state.round === ROUNDS_COUNT) {
          state.roundStep = RoundStep.GameCompleted;
        } else {
          state.roundStep = RoundStep.StartNext;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authActions.signOut, () => ({
      ...new GameState(),
    }));
  },
});

const { actions: gameActions, reducer: gameReducer } = gameSlice;
export { gameActions, gameReducer };

export type GameActions = ActionsType<typeof gameActions>;
