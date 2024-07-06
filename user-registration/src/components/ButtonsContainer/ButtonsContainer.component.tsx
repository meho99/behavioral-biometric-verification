import { Box } from "@mui/material";
import { ButtonsContainerProps } from "./ButtonsContainer.types";

export const ButtonsContainer = ({ children }: ButtonsContainerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      {children}
    </Box>
  );
};
