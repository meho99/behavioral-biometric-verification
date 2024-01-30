import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { roundSelector } from "../../../store/game/game.selectors";
import { Button } from "../../../components/Button";
import { gameActions } from "../../../store/game/game.slice";

export const StartNext = () => {
  const dispatch = useDispatch();
  const round = useSelector(roundSelector);

  const handleStartNextRound = () => {
    dispatch(gameActions.startNextRound());
  };

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h3" color="primary">
        {round} round completed!
      </Typography>
      <Typography variant="h3">Are you ready to start the next one?</Typography>

      <Button onClick={handleStartNextRound}>Start</Button>
    </Box>
  );
};
