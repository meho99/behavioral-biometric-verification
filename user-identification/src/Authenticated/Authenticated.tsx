import { Container, Typography } from "@mui/material";
import { AuthenticatedProps } from "./Authenticated.types";
import { useCallback, useState } from "react";
import { RequestStatus } from "../types";
import { Button } from "../components/Button";

export const Authenticated = ({
  loginEmail,
  setLoginEmail,
}: AuthenticatedProps) => {
  const [logOutStatus, setLogOutStatus] = useState<RequestStatus>("idle");

  const handleLogOut = useCallback(() => {
    const handleLogOut = async () => {
      setLogOutStatus("loading");

      // Stop background script
      let [tab] = await chrome.tabs.query({
        active: true,
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          chrome.runtime.sendMessage({
            eventType: "logoutCompleted",
          });
        },
      });

      setLoginEmail(undefined);
      setLogOutStatus("success");
    };

    handleLogOut();
  }, []);

  return (
    <Container disableGutters>
      <Typography variant="h2">Logged in as {loginEmail}</Typography>

      <Button
        sx={{ mt: 3 }}
        onClick={handleLogOut}
        isLoading={logOutStatus === "loading"}
      >
        Log Out
      </Button>
    </Container>
  );
};
