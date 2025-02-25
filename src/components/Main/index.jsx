import React, { useState, useEffect, useContext } from "react";
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

const Links = () => {
  const { token, user } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/links");
      setLinks(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    }
  };

  const handleAddLink = async () => {
    try {
      await axios.post("http://localhost:8000/api/links", { title, url });
      fetchLinks();
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Erro ao adicionar link:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Lista de Músicas</Typography>
      {token && (
        <div>
          <TextField label="Título" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="URL" fullWidth margin="normal" value={url} onChange={(e) => setUrl(e.target.value)} />
          <Button onClick={handleAddLink} variant="contained" color="primary">Adicionar Link</Button>
        </div>
      )}
      <List>
        {links.map((link) => (
          <ListItem key={link.id}>
            <ListItemText primary={link.title} secondary={link.url} />
            {user?.is_admin && (
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => console.log("Deletar", link.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Links;