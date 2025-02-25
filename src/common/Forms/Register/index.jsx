import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(email, password);
    if (success) history.push("/");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Registrar</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Senha" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>Registrar</Button>
      </form>
    </Container>
  );
};

export default RegisterForm;