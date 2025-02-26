import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";

function LinkItem ({ link, user, handleDeleteLink }) {
  return (
    <Card sx={{ mb: 2, bgcolor: "#2A2A2A", color: "white" }}>
      <CardContent>
        <ListItem>
          <img
            src={link.thumbnail}
            alt={link.title}
            style={{ width: "100px", borderRadius: "5px", marginRight: "15px" }}
          />
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
      {user?.is_admin && (
        <CardActions>
          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteLink(link.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default LinkItem;