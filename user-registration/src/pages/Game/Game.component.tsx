import { Container, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterPaths } from "../../router/router.paths";
import {
  roundSelector,
  roundStepSelector,
  scoreSelector,
} from "../../store/game/game.selectors";
import { RoundStep } from "../../store/game/game.types";
import { navigationActions } from "../../store/navigation/navigation.slice";
import { OrderPresentation } from "./OrderPresentation/OrderPresentation.component";
import { OrderSelection } from "./OrderSelection/OrderSelection.component";
import { StartNext } from "./StartNext/StartNext.component";
import { GameCompleted } from "./GameCompleted/GameCompleted";

export const Game = () => {
  const dispatch = useDispatch();
  const roundStep = useSelector(roundStepSelector);
  const round = useSelector(roundSelector);
  const score = useSelector(scoreSelector);

  useEffect(() => {
    if (round < 1) {
      dispatch(
        navigationActions.redirect({
          path: RouterPaths.GameTutorial,
        })
      );
    }
  }, [dispatch, round]);

  return (
    <Container>
      <Typography variant="h1">Game</Typography>
      <Typography variant="h3">Round: {round}</Typography>
      <Typography variant="h3">Score: {score}</Typography>

      {roundStep === RoundStep.OrderPresentation && <OrderPresentation />}
      {roundStep === RoundStep.OrderSelection && <OrderSelection />}
      {roundStep === RoundStep.StartNext && <StartNext />}
      {roundStep === RoundStep.GameCompleted && <GameCompleted />}
    </Container>
  );
};
