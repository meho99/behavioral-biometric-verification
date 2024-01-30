import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { RouterPaths } from "../../router/router.paths";

export const WrongPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">Page Not Found!</Typography>
      <Box>
        <Button component={Link} to={RouterPaths.Register}>
          Go Home
        </Button>
      </Box>
    </Box>
  );
};
