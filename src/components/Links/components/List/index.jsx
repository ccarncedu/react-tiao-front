import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Typography,
  TextField,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { act } from "react";
import SaveIcon from "@mui/icons-material/Save";

function LinkItem({ link, user, handleDeleteLink, handleApproveLink, handleEditLink }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedUrl, setEditedUrl] = React.useState(link.url);
  const [isApproved, setIsApproved] = React.useState(link.is_approved);

  const handleSave = () => {
    handleEditLink(link.id, { url: editedUrl });
    setIsEditing(false);
  };

  const handleApprove = async (id) => {
    await handleApproveLink(id);
    act(() => {
      setIsApproved(true);
    });
  };
  

  return (
    <Card sx={{ mb: 2, bgcolor: "#2A2A2A", color: "white" }}>
      <CardContent>
        <ListItem>
          <img
            src={link.thumbnail}
            alt={link.title}
            style={{ width: "100px", borderRadius: "5px", marginRight: "15px" }}
          />
          {isEditing ? (
            <TextField
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              fullWidth
              size="small"
              variant="outlined"
              sx={{ bgcolor: "white" }}
            />
          ) : (
            <ListItemText
              primary={link.title}
              secondary={
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#90CAF9" }}
                >
                  {link.url}
                </a>
              }
            />
          )}
        </ListItem>
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
        <CardActions>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLink(link.id)} color="error">
            <DeleteIcon />
          </IconButton>
          {!isApproved && (
            <IconButton edge="end" aria-label="approve" onClick={() => handleApprove(link.id)} color="success">
              <ThumbUpIcon />
            </IconButton>
          )}
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
  );
}

export default LinkItem;