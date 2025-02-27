import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider, { AuthContext } from "./providers/AuthProvider";
import Links from "./components/links";
import LoginModal from "./components/login";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import wallpaper from './assets/sertanejo-wallpaper.jpg';

function AppContent() {
  const { open, setOpen } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

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
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "Georgia, serif",
        filter: open ? "blur(5px)" : "none",
        pointerEvents: open ? "none" : "auto"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          zIndex: -1,
        }}
      />

      <Typography
        variant={isMobile ? "h5" : "h3"} 
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          letterSpacing: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 4,
          color: "#FFD700",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
          flexWrap: "wrap",
          padding: isMobile ? 1 : 2,
        }}
      >
        <MusicNoteIcon sx={{ fontSize: isMobile ? 30 : 40 }} />
        Tião Carreiro & Pardinho
        <MusicNoteIcon sx={{ fontSize: isMobile ? 30 : 40 }} />
      </Typography>

      <LoginModal open={open} />

      <Switch>
        <Route path="/" component={Links} />
      </Switch>
    </Box>
  );
}

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
