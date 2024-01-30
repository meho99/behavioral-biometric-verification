import { Box, Typography } from "@mui/material";
import { Button } from "../../../components/Button";
import { Link } from "react-router-dom";
import { RouterPaths } from "../../../router/router.paths";

export const GameCompleted = () => {
  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography variant="h3" color="primary">
        Game completed!
      </Typography>
      <Typography variant="h3">
        We gathered the needed information, you can now install and use our
        dedicated Browser extension!
      </Typography>

      <Button component={Link} to={RouterPaths.Home}>
        Go Home
      </Button>
    </Box>
  );
};
