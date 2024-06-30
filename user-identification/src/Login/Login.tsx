import { Container, Typography } from "@mui/material";
import { ControlledInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { useForm } from "react-hook-form";
import { LoginProps, LoginValues } from "./Login.types";
import { useCallback, useState } from "react";
import { login } from "../api/login";
import { RequestStatus } from "../types";

export const Login = ({ setLoginEmail }: LoginProps) => {
  const [loginStatus, setLoginStatus] = useState<RequestStatus>("idle");

  const onSubmit = useCallback(({ email, password }: LoginValues) => {
    const handleLogin = async () => {
      setLoginStatus("loading");
      try {
        // Login user
        await login({ email, password });

        // Start background script
        let [tab] = await chrome.tabs.query({
          active: true,
        });

        await chrome.scripting.executeScript({
          target: { tabId: tab.id! },
          func: () => {
            chrome.runtime.sendMessage({
              eventType: "loginCompleted",
              eventDetails: {
                email: "michal.t1506@gmail.com",
              },
            });
          },
        });

        setLoginEmail(email);
        setLoginStatus("success");
      } catch (error) {
        console.error(error);
        setLoginStatus("error");
      }
    };

    handleLogin();
  }, []);

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

      <Button
        sx={{ mt: 3 }}
        type="submit"
        disabled={isSubmitted && !isValid}
        isLoading={loginStatus === "loading"}
      >
        Login
      </Button>
    </Container>
  );
};
