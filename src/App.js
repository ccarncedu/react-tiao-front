import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Links from "./components/Links";
import LoginModal from "./components/LoginModal";
import { Box } from "@mui/material";

const App = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <AuthProvider>
      <Router>
        <Box
          sx={{
            bgcolor: "#121212",
            width: "100%",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoginModal open={open} handleClose={handleClose} />
          <Switch>
            <Route path="/" component={Links} />
          </Switch>
        </Box>
      </Router>
    </AuthProvider>
  );
};

export default App;
