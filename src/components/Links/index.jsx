import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Paper,
  TextField,
  Pagination
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { fetchLinks, addLink, deleteLink } from "../../services/links.service";
import { AuthContext } from "../../providers/AuthProvider";

const Links = () => {
  const { token, user } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;

  useEffect(() => {
    const getLinks = async () => {
      const data = await fetchLinks(page, perPage);
      if (data) {
        const sortedData = data.data.sort((a, b) => Number(b.views) - Number(a.views));
        setLinks(sortedData);
        setTotalPages(data.total_pages);
      } else {
        setLinks([]);
      }
    };
    getLinks();
  }, [page]);

  const handleAddLink = async () => {
    try {
      await addLink(title, url);
      const data = await fetchLinks(page, perPage);
      setLinks(data.data);
      setTotalPages(data.total_pages);
      setTitle("");
      setUrl("");
    } catch (error) {
      console.error("Erro ao adicionar link:", error);
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      await deleteLink(id);
      const data = await fetchLinks(page, perPage);
      setLinks(data.data);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: "#121212", minHeight: "100vh", py: 4 }}>
      <Paper elevation={4} sx={{ bgcolor: "#1E1E1E", color: "white", padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Tião Carreiro e Pardinho
        </Typography>

        {token && (
          <Card sx={{ mb: 3, p: 3, bgcolor: "#2A2A2A", color: "white", borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ textAlign: "center", color: "#fff" }}>
                Adicionar Novo Link
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Adicione aqui a URL do seu vídeo do YouTube"
                  variant="outlined"
                  fullWidth
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  InputLabelProps={{ style: { color: "#bbb" } }}
                  InputProps={{
                    style: { color: "white", backgroundColor: "#3A3A3A", borderRadius: 5 },
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
        )}

        <List>
          {links.map((link, index) => (
            <Card key={link.id} sx={{ mb: 2, bgcolor: "#2A2A2A", color: "white" }}>
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
          ))}
        </List>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />
      </Paper>
    </Container>
  );
};

export default Links;