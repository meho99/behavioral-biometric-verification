export enum RoundStep {
  OrderPresentation = "orderPresentation",
  OrderSelection = "orderSelection",
  StartNext = "startNext",
  GameCompleted = "gameCompleted",
}

export type BlockToSelect = { color: string; left: number; top: number };

export type SelectBlockPayload = { color: string };
