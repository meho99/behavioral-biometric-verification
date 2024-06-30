import { useEffect, useState } from "react";
import { Login } from "./Login/Login";
import { Container, Typography } from "@mui/material";
import { Authenticated } from "./Authenticated/Authenticated";

function App() {
  const [loginEmail, setLoginEmail] = useState<string>();

  useEffect(() => {
    const handleCheckCurrentUser = async () => {
      chrome.runtime.sendMessage({ eventType: "getUserEmail" }, (email) => {
        setLoginEmail(email);
      });
    };

    handleCheckCurrentUser();
  }, []);

  return (
    <Container
      sx={{
        width: "450px",
        borderColor: "primary.main",
        borderWidth: 2,
        borderStyle: "solid",
      }}
    >
      <Typography variant="h1">Mouse Movement Verification</Typography>

      {loginEmail ? (
        <Authenticated loginEmail={loginEmail} setLoginEmail={setLoginEmail} />
      ) : (
        <Login setLoginEmail={setLoginEmail} />
      )}
    </Container>
  );
}

export default App;
