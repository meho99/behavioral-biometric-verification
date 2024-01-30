import { ActionCreatorsMapObject } from "redux";

export type ActionsType<A extends ActionCreatorsMapObject> = {
  [actionName in keyof A]: ReturnType<A[actionName]>;
};

export type RequestStatus = "idle" | "loading" | "success" | "error";
