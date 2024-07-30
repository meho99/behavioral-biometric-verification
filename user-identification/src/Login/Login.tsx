import { Box, Container, Typography } from "@mui/material";
import { ControlledInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { LoginProps, LoginValues } from "./Login.types";
import { useCallback, useState } from "react";
import { login } from "../api/login";
import { RequestStatus } from "../types";

export const Login = ({ setLoginEmail }: LoginProps) => {
  const [loginStatus, setLoginStatus] = useState<RequestStatus>("idle");

  const onSubmit = useCallback(
    ({ email, password }: LoginValues) => {
      const handleLogin = async () => {
        setLoginStatus("loading");
        try {
          // Login user
          await login({ email, password });

          await chrome.runtime.sendMessage({
            eventType: "loginCompleted",
            eventDetails: { email: email },
          });

          setLoginEmail(email);
          setLoginStatus("success");
        } catch (error) {
          console.error(error);
          setLoginStatus("error");
        }
      };

      handleLogin();
    },
    [setLoginEmail]
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
      disableGutters
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ gap: 2 }}
    >
      <Typography variant="h2">Login To Existing Account</Typography>

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

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mt: 3, width: 200 }}
          type="submit"
          disabled={isSubmitted && !isValid}
          isLoading={loginStatus === "loading"}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};
