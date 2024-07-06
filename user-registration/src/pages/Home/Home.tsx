import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { userSelector } from "../../store/auth/auth.selectors";
import { Link } from "react-router-dom";
import { RouterPaths } from "../../router/router.paths";
import { ButtonsContainer } from "../../components/ButtonsContainer/ButtonsContainer.component";

export const Home = () => {
  const user = useSelector(userSelector);

  return (
    <Container sx={{ gap: 2 }}>
      <Typography variant="h1">Home</Typography>

      {!user?.isGameCompleted && (
        <>
          <Typography variant="h3">
            In order to gather the information about your mouse usage behavior,
            we prepared a short game. You must complete the game in one session.
            If you close the browser window, your progress will be lost. It will
            take you about 5 minutes to finish.
          </Typography>

          <Typography variant="h3" color="error">
            Note: You wont be able to use the app until you finish the game.
          </Typography>

          <ButtonsContainer>
            <Button
              component={Link}
              to={RouterPaths.GameTutorial}
              sx={{ mt: 3, width: 400 }}
            >
              Start now
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Container>
  );
};
