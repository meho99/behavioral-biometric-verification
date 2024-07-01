import { useEffect, useState } from "react";
import { Login } from "./Login/Login";
import { Container, Typography } from "@mui/material";
import { Authenticated } from "./Authenticated/Authenticated";
import { VerificationResult } from "./types";

function App() {
  const [loginEmail, setLoginEmail] = useState<string>();
  const [verificationResults, setVerificationResults] = useState<
    VerificationResult[]
  >([]);

  useEffect(() => {
    const handleCheckCurrentUser = async () => {
      chrome.runtime.sendMessage(
        { eventType: "getUserData" },
        ({ userEmail, finalVerificationResults }) => {
          setLoginEmail(userEmail);
          setVerificationResults(finalVerificationResults);
        }
      );

      // setLoginEmail("test@test.test");
      // setVerificationResults([
      //   {
      //     timestamp: 1632840000000,
      //     status: "success",
      //   },
      //   {
      //     timestamp: 1732840000000,
      //     status: "failed",
      //   },
      // ]);
    };

    handleCheckCurrentUser();
  }, []);

  return (
    <Container
      sx={{
        width: "450px",
        borderColor: "background.paper",
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <Typography variant="h1">Mouse Movement Verification</Typography>

      {loginEmail ? (
        <Authenticated
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          verificationResults={verificationResults}
        />
      ) : (
        <Login setLoginEmail={setLoginEmail} />
      )}
    </Container>
  );
}

export default App;
