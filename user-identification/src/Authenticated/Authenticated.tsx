import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import { AuthenticatedProps } from "./Authenticated.types";
import { useCallback, useMemo, useState } from "react";
import { RequestStatus } from "../types";
import { Button } from "../components/Button";

export const Authenticated = ({
  loginEmail,
  setLoginEmail,
  verificationResults,
}: AuthenticatedProps) => {
  const [logOutStatus, setLogOutStatus] = useState<RequestStatus>("idle");
  const { palette } = useTheme();

  const sortedVerificationResults = useMemo(
    () => verificationResults.sort((a, b) => b.timestamp - a.timestamp),
    [verificationResults]
  );

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

      <Typography variant="h4" sx={{ mt: 5, mb: 0.7 }}>
        Verification Results
      </Typography>

      <Table>
        <TableHead>
          <TableCell>Date</TableCell>
          <TableCell>Status</TableCell>
        </TableHead>

        <TableBody>
          {verificationResults.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} sx={{ border: "none" }}>
                No verifications yet
              </TableCell>
            </TableRow>
          ) : (
            <>
              {sortedVerificationResults.map((result) => (
                <TableRow>
                  <TableCell>
                    {new Date(result.timestamp).toLocaleString()}
                  </TableCell>

                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 13,
                      color:
                        result.status === "success"
                          ? palette.success.main
                          : palette.error.main,
                    }}
                  >
                    {result.status}
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mt: 5, width: 200 }}
          onClick={handleLogOut}
          isLoading={logOutStatus === "loading"}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
};
