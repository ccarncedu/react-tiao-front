import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider, { AuthContext } from "./providers/AuthProvider";
import Links from "./components/links";
import LoginModal from "./components/login";
import { Box } from "@mui/material";

function AppContent ()  {
  const { open, setOpen } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setOpen(true);
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/check-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.data.valid) {
          setOpen(true);
        } else {
          setOpen(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setOpen(true);
      }
    };

    checkAuth();
  }, [token, setOpen]);

  return (
    <Box
      sx={{
        bgcolor: "#121212",
        width: "100%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        filter: open ? "blur(5px)" : "none",
        pointerEvents: open ? "none" : "auto",
      }}
    >
      <LoginModal open={open} />
      <Switch>
        <Route path="/" component={Links} />
      </Switch>
    </Box>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;