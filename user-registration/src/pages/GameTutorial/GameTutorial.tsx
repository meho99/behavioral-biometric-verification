import { Container, Typography } from "@mui/material";
import { Button } from "../../components/Button";
import { RouterPaths } from "../../router/router.paths";
import { useDispatch } from "react-redux";
import { gameActions } from "../../store/game/game.slice";
import { navigationActions } from "../../store/navigation/navigation.slice";
import { ROUNDS_COUNT } from "../../store/game/game.const";

export const GameTutorial = () => {
  const dispatch = useDispatch();

  const handleStartGame = () => {
    dispatch(
      navigationActions.redirect({
        path: RouterPaths.Game,
      })
    );
    dispatch(gameActions.startNextRound());
  };

  return (
    <Container sx={{ gap: 2 }}>
      <Typography variant="h1">Game Tutorial</Typography>
      <Typography variant="h3">
        The game contains {ROUNDS_COUNT} rounds. From each round you can earn
        max 10 points. Each round consists of 2 steps:
      </Typography>
      <Typography variant="h3" color="primary">
        - Step 1.
      </Typography>
      Before each round you will see the list of 6 blocks, each of them with
      different color. You will have 5 seconds to remember the order of the
      colors.
      <Typography variant="h3" color="primary">
        - Step 2.
      </Typography>
      After the time you will see blocks with the same colors at random
      positions on the screen. Your task is to click on the blocks in the order
      you saw them before. You will receive one point for each correct click.
      <Typography variant="h4" sx={{ mt: 3 }}>
        There is no speed information gathered so there is no point in trying to
        click on the blocks as quick as possible. The only thing that matters is
        the order of clicks.
      </Typography>
      <Typography variant="h4">
        Do not worry if the score is not satisfactory to you. The point of the
        system is only to get to know your mouse usage patterns :)
      </Typography>
      <Button onClick={handleStartGame} sx={{ mt: 3 }}>
        Start Game Now
      </Button>
    </Container>
  );
};
