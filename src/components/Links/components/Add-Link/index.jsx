import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";

function AddLink({ url, setUrl, handleAddLink }) {
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "info" });

  const handleSubmit = async () => {
    if (!url.trim()) {
      setFeedback({ open: true, message: "Por favor, insira um link válido do YouTube.", severity: "error" });
      return;
    }

    try {
      await handleAddLink();
      setFeedback({ open: true, message: "Link adicionado com sucesso!", severity: "success" });
    } catch (error) {
      setFeedback({ open: true, message: "Erro ao adicionar link. Tente novamente.", severity: "error" });
    }
  };

  return (
    <Card sx={{ mb: 3, p: 3, bgcolor: "#2A2A2A", color: "white", borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center", color: "#FFD700" }}>
          Adicionar Link do YouTube
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Insira a URL do vídeo"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: {
                color: "white",
                backgroundColor: "#3A3A3A",
                borderRadius: 5,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": { borderColor: "#90CAF9" },
              },
            }}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
            py: 1.5,
            fontSize: "1rem",
          }}
        >
          Adicionar Link
        </Button>
      </CardActions>

      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        <Alert onClose={() => setFeedback({ ...feedback, open: false })} severity={feedback.severity} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default AddLink;