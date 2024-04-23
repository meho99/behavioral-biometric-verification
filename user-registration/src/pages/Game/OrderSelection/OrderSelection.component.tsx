import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { blocksToSelectSelector } from "../../../store/game/game.selectors";
import { BOARD_HEIGHT } from "../../../store/game/game.const";
import { OrderSelectionItem } from "./OrderSelection.item";
import { useCallback, useEffect, useState } from "react";
import { MousePositionEvent } from "../../../store/mouseEvents/mouseEvents.types";
import { mouseEventsActions } from "../../../store/mouseEvents/mouseEvents.slice";

export const OrderSelection = () => {
  const dispatch = useDispatch();
  const blocks = useSelector(blocksToSelectSelector);

  const [mousePositions, setMousePositions] = useState<MousePositionEvent[]>(
    []
  );

  const handleMouseClick = useCallback(() => {
    dispatch(mouseEventsActions.postStroke(mousePositions));
    setMousePositions([]);
  }, [dispatch, mousePositions]);

  useEffect(() => {

    const handleMouseMove = (event: MouseEvent) => {
      setMousePositions((events) => [
        ...events,
        { x: event.clientX, y: event.clientY, timestamp: Date.now() },
      ]);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [dispatch]);

  return (
    <Box sx={{ mt: 3 }} onClick={handleMouseClick}>
      <Typography variant="h2">
        Click on the blocks in the order you remember.
      </Typography>

      <Box
        sx={{
          backgroundColor: "transparent",
          width: "100vw",
          height: BOARD_HEIGHT,
          position: "absolute",
          left: 0,
          padding: 0,
        }}
      >
        {blocks.map((block, index) => (
          <OrderSelectionItem key={index} {...block} />
        ))}
      </Box>
    </Box>
  );
};
