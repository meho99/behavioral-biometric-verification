import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameActions } from "../../../store/game/game.slice";
import { PRESENTATION_TIME } from "./OrderPresentation.const";
import { orderSelector } from "../../../store/game/game.selectors";
import { ColorBlockWithOrder } from "./OrderPresentation.item";

export const OrderPresentation = () => {
  const dispatch = useDispatch();
  const [remainingTime, setRemainingTime] = useState(5 * 1000);
  const [tutorialStartTimestamp, setTutorialStartTimestamp] =
    useState<number>();

  const order = useSelector(orderSelector);

  useEffect(() => {
    if (!tutorialStartTimestamp) return;

    const interval = setInterval(() => {
      const currentTimestamp = Date.now();
      const elapsedTime = currentTimestamp - tutorialStartTimestamp;

      setRemainingTime((PRESENTATION_TIME - elapsedTime) / 1000);

      if (elapsedTime >= PRESENTATION_TIME) {
        clearInterval(interval);
        dispatch(gameActions.startOrderSelection());
        return;
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, tutorialStartTimestamp]);

  useEffect(() => {
    setTutorialStartTimestamp(Date.now());
  }, []);

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h2">
        Try to remember order of the colors of the blocks.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        {order.map((color, index) => (
          <ColorBlockWithOrder key={index} index={index} color={color} />
        ))}
      </Box>

      <Typography variant="h3">
        You have{" "}
        <Typography variant="h3" component="span" color="primary">
          {remainingTime.toFixed(1)}
        </Typography>{" "}
        seconds left.
      </Typography>
    </Box>
  );
};
