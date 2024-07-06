import { Container, Typography, Link as MuiLink, Box } from "@mui/material";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { ControlledInput } from "../../components/TextInput";
import { signUpStatusSelector } from "../../store/auth/auth.selectors";
import { authActions } from "../../store/auth/auth.slice";
import { LoginValues } from "./Login.types";
import { RouterPaths } from "../../router/router.paths";
import { Link } from "react-router-dom";
import { ButtonsContainer } from "../../components/ButtonsContainer/ButtonsContainer.component";

export const Login = () => {
  const dispatch = useDispatch();
  const signUpStatus = useSelector(signUpStatusSelector);

  const onSubmit = useCallback(
    ({ email, password }: LoginValues) => {
      dispatch(authActions.login({ email, password }));
    },
    [dispatch]
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitted, isValid },
  } = useForm<LoginValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: 2, minWidth: 700 }}
    >
      <Box>
        <Typography variant="h1">Mouse Movement Verification</Typography>
        <Typography variant="h2">Login To Existing Account</Typography>
      </Box>

      <ControlledInput
        sx={{ mt: 3 }}
        autoFocus
        fullWidth
        control={control}
        name="email"
        type="email"
        title="Email Address"
      />

      <ControlledInput
        fullWidth
        control={control}
        name="password"
        type="password"
        title="Password"
      />

      <ButtonsContainer>
        <Button
          sx={{ mt: 3, width: 400 }}
          type="submit"
          disabled={isSubmitted && !isValid}
          isLoading={signUpStatus === "loading"}
        >
          Login
        </Button>

        <Typography>
          Don't have an account?{" "}
          <MuiLink component={Link} to={RouterPaths.Register}>
            Register
          </MuiLink>
        </Typography>
      </ButtonsContainer>
    </Container>
  );
};
