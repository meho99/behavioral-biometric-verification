import { Container, Typography, Link as MuiLink, Box } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { ControlledInput } from "../../components/TextInput";
import { signUpStatusSelector } from "../../store/auth/auth.selectors";
import { authActions } from "../../store/auth/auth.slice";
import { SignUpValues } from "./SignUp.types";
import { Link } from "react-router-dom";
import { RouterPaths } from "../../router/router.paths";
import { ButtonsContainer } from "../../components/ButtonsContainer/ButtonsContainer.component";

export const SignUp = () => {
  const dispatch = useDispatch();
  const signUpStatus = useSelector(signUpStatusSelector);

  const onSubmit = useCallback(
    ({ email, password }: SignUpValues) => {
      dispatch(authActions.signUp({ email, password }));
    },
    [dispatch]
  );

  const {
    watch,
    trigger,
    control,
    getValues,
    handleSubmit,
    formState: { isSubmitted, isValid },
  } = useForm<SignUpValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");

  useEffect(() => {
    const confirmPassword = getValues("confirmPassword");
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [getValues, passwordValue, trigger]);

  return (
    <Container
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: 2, minWidth: 700 }}
    >
      <Box>
        <Typography variant="h1">Mouse Movement Verification</Typography>
        <Typography variant="h2">Create Your Account</Typography>
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
      <ControlledInput
        fullWidth
        control={control}
        name="confirmPassword"
        type="password"
        title="Confirm password"
        rules={{
          validate: (value) =>
            value === passwordValue || "The passwords do not match",
        }}
      />

      <ButtonsContainer>
        <Button
          sx={{ mt: 3, width: 400 }}
          type="submit"
          disabled={isSubmitted && !isValid}
          isLoading={signUpStatus === "loading"}
        >
          Submit
        </Button>

        <Typography>
          Already have an account?{" "}
          <MuiLink component={Link} to={RouterPaths.Login}>
            Login
          </MuiLink>
        </Typography>
      </ButtonsContainer>
    </Container>
  );
};
