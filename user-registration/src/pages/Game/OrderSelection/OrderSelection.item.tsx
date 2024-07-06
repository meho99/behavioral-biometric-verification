import { Box, IconButton } from "@mui/material";
import { OrderSelectionItemProps } from "./OrderSelection.types";
import { BLOCK_SIZE } from "../../../store/game/game.const";
import { useDispatch } from "react-redux";
import { gameActions } from "../../../store/game/game.slice";
import { useState } from "react";

export const OrderSelectionItem = ({
  color,
  left,
  top,
}: OrderSelectionItemProps) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const handleBlockClick = () => {
    dispatch(gameActions.selectBlock({ color }));
    setIsClicked(true);
  };

  return (
    <Box
      sx={{
        top,
        left,
        position: "absolute",
      }}
    >
      {!isClicked && (
        <IconButton sx={{ p: 0 }} onClick={handleBlockClick}>
          <Box
            sx={{
              backgroundColor: color,
              width: BLOCK_SIZE,
              height: BLOCK_SIZE,
              borderRadius: "10px",
              boxShadow: ({ palette }) => {
                const darkColor = palette.augmentColor({
                  color: { main: color },
                }).dark;
                return `0px 0px 15px 1px ${darkColor}}`;
              },
            }}
          />
        </IconButton>
      )}
    </Box>
  );
};
