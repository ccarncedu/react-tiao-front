import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function LinkItem({ link, user, handleDeleteLink, handleApproveLink, handleEditLink }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUrl, setEditedUrl] = useState(link.url);
  const [isApproved, setIsApproved] = useState(link.is_approved);
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "info" });

  const handleSave = async () => {
    try {
      await handleEditLink(link.id, { url: editedUrl });
      setFeedback({ open: true, message: "Link editado com sucesso!", severity: "success" });
      setIsEditing(false);
    } catch (error) {
      setFeedback({ open: true, message: "Erro ao editar link. Tente novamente.", severity: "error" });
    }
  };

  const handleApprove = async (id) => {
    try {
      await handleApproveLink(id);
      setIsApproved(true);
      setFeedback({ open: true, message: "Link aprovado com sucesso!", severity: "success" });
    } catch (error) {
      setFeedback({ open: true, message: "Erro ao aprovar link. Tente novamente.", severity: "error" });
    }
  };

  return (
    <Paper elevation={4} sx={{ mb: 2, p: 2, borderRadius: 3, bgcolor: "#1E1E1E", color: "white" }}>
      <Card sx={{ bgcolor: "transparent", boxShadow: "none" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <img
              src={link.thumbnail}
              alt={link.title}
              style={{ width: "90px", height: "90px", borderRadius: "8px", marginRight: "15px" }}
            />
            <Box flexGrow={1}>
              {isEditing ? (
                <TextField
                  value={editedUrl}
                  onChange={(e) => setEditedUrl(e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{ bgcolor: "white", borderRadius: 1 }}
                />
              ) : (
                <>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
                    {link.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#90CAF9" }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
                      {link.url}
                    </a>
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Typography variant="body2" color="white">
              <VisibilityIcon sx={{ verticalAlign: "middle" }} /> {parseInt(link.views).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="white">
              <ThumbUpIcon sx={{ verticalAlign: "middle" }} /> {parseInt(link.likes).toLocaleString()}
            </Typography>
          </Stack>
        </CardContent>

        {Boolean(user?.is_admin) && (
          <CardActions sx={{ justifyContent: "space-between", mt: 1 }}>
            <Box>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLink(link.id)} color="error">
                <DeleteIcon />
              </IconButton>
              {!isApproved && (
                <IconButton edge="end" aria-label="approve" onClick={() => handleApprove(link.id)} color="success">
                  <ThumbUpIcon />
                </IconButton>
              )}
            </Box>

            {isEditing ? (
              <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                Salvar
              </Button>
            ) : (
              <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)} color="info">
                <EditIcon />
              </IconButton>
            )}
          </CardActions>
        )}
      </Card>

      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
      >
        <Alert onClose={() => setFeedback({ ...feedback, open: false })} severity={feedback.severity} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default LinkItem;