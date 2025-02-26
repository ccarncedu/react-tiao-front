import React, { useState } from "react";
import { Modal, Box, Button, Typography, Fade, Stack } from "@mui/material";
import LoginForm from "../../common/Forms/login";
import RegisterForm from "../../common/Forms/register";

function LoginModal({ open, handleClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
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

          {isLogin ? <LoginForm /> : <RegisterForm />}

          <Stack spacing={2} mt={2}>
            <Button
              onClick={toggleForm}
              variant="text"
              sx={{ textTransform: "none", fontSize: "0.9rem" }}
            >
              {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
            </Button>

            <Button
              onClick={handleClose}
              variant="contained"
              color="error"
              fullWidth
              sx={{ mt: 1 }}
            >
              Fechar
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

export default LoginModal;
