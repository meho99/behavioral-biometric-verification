import { RouteObject } from "react-router-dom";
import { Game } from "../pages/Game/Game.component.tsx";
import { GameTutorial } from "../pages/GameTutorial/GameTutorial";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { SignUp } from "../pages/SignUp/SignUp";
import { RouterPaths } from "./router.paths";

export const baseRoutes: RouteObject[] = [
  {
    path: RouterPaths.Root,
    element: <Login />,
  },
  {
    path: RouterPaths.Register,
    element: <SignUp />,
  },
  {
    path: RouterPaths.Login,
    element: <Login />,
  },
];

export const authenticatedRoutes: RouteObject[] = [
  {
    path: RouterPaths.Home,
    element: <Home />,
  },
  {
    path: RouterPaths.GameTutorial,
    element: <GameTutorial />,
  },
  {
    path: RouterPaths.Game,
    element: <Game />,
  },
];
