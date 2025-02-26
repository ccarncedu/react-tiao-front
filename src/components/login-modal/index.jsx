import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import LoginForm from "../../common/Forms/login";
import RegisterForm from "../../common/Forms/register";

const LoginModal = ({ open, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  console.log(isLogin, 'islogin')
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 1
      }}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <Button onClick={toggleForm} fullWidth>
          {isLogin ? "Não tem uma conta? Registre-se" : "Já tem uma conta? Faça login"}
        </Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;