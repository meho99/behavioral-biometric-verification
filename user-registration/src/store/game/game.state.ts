import { RoundStep } from "./game.types";

export class GameState {
  roundStep = RoundStep.OrderPresentation;
  order: string[] = [];
  round: number = 0;
  score: number = 0;

  clickedBlocksCount: number = 0;
}
