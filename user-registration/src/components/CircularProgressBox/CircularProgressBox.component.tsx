import { Box, CircularProgress } from "@mui/material";
import { CircularProgressBoxProps } from "./CircularProgressBox.types";

export const CircularProgressBox = (props: CircularProgressBoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        ...props.sx,
      }}
    >
      <CircularProgress {...props} />
    </Box>
  );
};
