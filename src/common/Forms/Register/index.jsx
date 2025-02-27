import React, { useState } from "react";
import { TextField, Button, Paper, Typography, Box, Snackbar, Alert } from "@mui/material";

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "info" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await onSubmit(name, email, password);
      if (success) {
        setFeedback({ open: true, message: "Cadastro realizado com sucesso!", severity: "success" });
      } else {
        setFeedback({ open: true, message: "Erro ao cadastrar. Tente novamente.", severity: "error" });
      }
    } catch (error) {
      setFeedback({ open: true, message: "Erro inesperado. Tente novamente mais tarde.", severity: "error" });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, width: 320, mx: "auto", mt: 5 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Criar Conta
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Nome"
          type="text"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrar
        </Button>
      </Box>

      <Snackbar open={feedback.open} autoHideDuration={4000} onClose={() => setFeedback({ ...feedback, open: false })}>
        <Alert onClose={() => setFeedback({ ...feedback, open: false })} severity={feedback.severity} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default RegisterForm;