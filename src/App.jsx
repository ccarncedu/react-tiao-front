import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import Links from "./components/Links";
import LoginModal from "./components/LoginModal";
import { Button } from "@mui/material";

const App = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AuthProvider>
      <Router>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Login / Registrar
        </Button>
        <LoginModal open={open} handleClose={handleClose} />
        <Routes>
          <Route path="/" element={<Links />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;