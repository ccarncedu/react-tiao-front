import React, { useState, useContext } from "react";
import { Modal, Box, Button, Typography, Fade, Stack } from "@mui/material";
import LoginForm from "../../common/Forms/login";
import RegisterForm from "../../common/Forms/register";
import { AuthContext } from "../../providers/AuthProvider";

function LoginModal({ open }) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (email, password) => {
    const success = await login(email, password);
    if (success) {
    }
  };

  const handleRegister = async (name, email, password) => {
    const success = await register(name, email, password);
    if (success) {
    }
  };

  return (
    <Modal open={open} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 320, sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {isLogin ? "Entrar" : "Criar Conta"}
          </Typography>

          {isLogin ? <LoginForm onSubmit={handleLogin} /> : <RegisterForm onSubmit={handleRegister} />}

          <Stack spacing={2} mt={2}>
            <Button
              onClick={toggleForm}
              variant="text"
              sx={{ textTransform: "none", fontSize: "0.9rem" }}
            >
              {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

export default LoginModal;