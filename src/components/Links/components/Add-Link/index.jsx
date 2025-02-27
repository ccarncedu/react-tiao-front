import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  TextField,
} from "@mui/material";

function AddLink({ url, setUrl, handleAddLink }) {
  return (
    <Card
      sx={{ mb: 3, p: 3, bgcolor: "#2A2A2A", color: "white", borderRadius: 2 }}
    >
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="Adicione aqui a URL do seu vídeo do YouTube"
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
          onClick={handleAddLink}
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
    </Card>
  );
}

export default AddLink;
