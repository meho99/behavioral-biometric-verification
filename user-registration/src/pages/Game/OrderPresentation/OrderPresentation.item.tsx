import { Box, Typography } from "@mui/material";
import { ColorBlockWithOrderProps } from "./OrderPresentation.types";

export const ColorBlockWithOrder = ({
  index,
  color,
}: ColorBlockWithOrderProps) => {
  return (
    <Box>
      <Typography>{index + 1}.</Typography>
      <Box
        sx={{
          backgroundColor: color,
          width: 100,
          height: 100,
          borderRadius: "10px",
          boxShadow: ({ palette }) => {
            const darkColor = palette.augmentColor({
              color: { main: color },
            }).dark;
            return `0px 0px 15px 1px ${darkColor}}`;
          },
        }}
      />
    </Box>
  );
};
