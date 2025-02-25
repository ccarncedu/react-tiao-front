import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Stack,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { fetchLinks, addLink, deleteLink } from "../../services/links.service";
import { AuthContext } from "../../providers/AuthProvider";

const Links = () => {
  const { token, user } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getLinks = async () => {
      const data = await fetchLinks();
      setLinks(data);
    };
    getLinks();
  }, []);

  const handleAddLink = async () => {
    try {
      await addLink(title, url);
      const data = await fetchLinks();
      setLinks(data);
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Erro ao adicionar link:", error);
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      await deleteLink(id);
      const data = await fetchLinks();
      setLinks(data);
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#121212", minHeight: "100vh", py: 4 }}>
      <Paper elevation={4} sx={{ bgcolor: "#1E1E1E", color: "white", padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Tião Carreiro
        </Typography>

        {token && (
          <Card sx={{ mb: 3, p: 2, bgcolor: "#2A2A2A", color: "white" }}>
            <CardContent>
              <Stack spacing={2}>
                <TextField
                  label="Título"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{ style: { color: "white" } }}
                />
                <TextField
                  label="URL"
                  fullWidth
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{ style: { color: "white" } }}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                onClick={handleAddLink}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<AddIcon />}
              >
                Adicionar Link
              </Button>
            </CardActions>
          </Card>
        )}

        <List>
          {links.map((link) => (
            <Card key={link.id} sx={{ mb: 2, bgcolor: "#2A2A2A", color: "white" }}>
              <CardContent>
                <ListItem>
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
                  {user?.is_admin && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteLink(link.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                  )}
                </ListItem>
              </CardContent>
            </Card>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Links;