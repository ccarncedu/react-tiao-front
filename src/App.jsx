import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider";
import Links from "./components/links";
import LoginModal from "./components/Login-Modal";
import { Box } from "@mui/material";

function App () {
  const [open, setOpen] = useState(true);
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
  }, [token]);

  const handleClose = () => {
    if (localStorage.getItem("token")) {
      setOpen(false);
    }
  };

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
            filter: open ? "blur(5px)" : "none",
            pointerEvents: open ? "none" : "auto",
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