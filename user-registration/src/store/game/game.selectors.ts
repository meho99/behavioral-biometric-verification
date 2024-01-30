import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store.config";
import { BLOCK_SIZE, BOARD_HEIGHT } from "./game.const";
import { BlockToSelect } from "./game.types";

const selectGame = (state: RootState) => state.game;

export const roundSelector = createSelector(selectGame, (game) => game.round);
export const roundStepSelector = createSelector(
  selectGame,
  (game) => game.roundStep
);
export const orderSelector = createSelector(selectGame, (game) => game.order);
export const scoreSelector = createSelector(selectGame, (game) => game.score);

export const blocksToSelectSelector = createSelector(orderSelector, (order) => {
  const screenWidth = window.innerWidth;

  const settledBlocks: BlockToSelect[] = [];

  for (const color of order) {
    let left: number | undefined = undefined;
    let top: number | undefined = undefined;

    while (typeof left === "undefined" || typeof top === "undefined") {
      const newLeft = Math.floor(Math.random() * (screenWidth - BLOCK_SIZE));
      const newTop = Math.floor(Math.random() * (BOARD_HEIGHT - BLOCK_SIZE));

      const tooCloseBlock = settledBlocks.some((existingBlock) => {
        const horizontalDistance = Math.abs(newLeft - existingBlock.left);
        const verticalDistance = Math.abs(newTop - existingBlock.top);

        return horizontalDistance < BLOCK_SIZE && verticalDistance < BLOCK_SIZE;
      });

      if (!tooCloseBlock) {
        left = newLeft;
        top = newTop;
      }
    }

    settledBlocks.push({ color, left, top });
  }

  return settledBlocks;
});
