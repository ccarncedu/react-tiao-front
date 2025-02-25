import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import LoginForm from "../../common/Forms/Login";
import RegisterForm from "../../common/Forms/Register";

const LoginModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ width: 400, margin: 'auto', marginTop: '10%', padding: 2, backgroundColor: 'white', borderRadius: 1 }}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Button onClick={toggleForm} fullWidth>
          {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;