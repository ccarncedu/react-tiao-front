import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  List,
  Paper,
  Pagination
} from "@mui/material";
import { fetchLinks, addLink, deleteLink, editLink, approveLink } from "../../services/links.service";
import { AuthContext } from "../../providers/AuthProvider";
import AddLink from "./components/Add-Link";
import LinkItem from "./components/List";

function Links() {
  const { token, user } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;
  
  const reloadLinks = async (retryCount = 3) => {
    if (!token) {
      if (retryCount > 0) {
        setTimeout(() => reloadLinks(retryCount - 1), 500);
      }
      return;
    }

    try {
      const data = await fetchLinks(page, perPage, token);
      if (data) {
        const sortedData = data.data.sort((a, b) => Number(b.views) - Number(a.views));
        setLinks(sortedData);
        setTotalPages(data.total_pages);
      } else {
        setLinks([]);
      }
    } catch (error) {
      console.error("Erro ao buscar links:", error);
    }
  };

  useEffect(() => {
    if (token) {
      reloadLinks();
    }
  }, [token, page]);

  const handleAddLink = async () => {
    if (!token) return;

    try {
      await addLink(title, url, token);
      setTitle("");
      setUrl("");
      reloadLinks();
    } catch (error) {
      console.error("Erro ao adicionar link:", error);
    }
  };

  const handleDeleteLink = async (id) => {
    if (!token) return;

    try {
      await deleteLink(id, token);
      reloadLinks(); 
    } catch (error) {
      console.error("Erro ao deletar link:", error);
    }
  };

  const handleEditLink = async (id, data) => {
    if (!token) return;

    try {
      await editLink(id, data, token);
      reloadLinks();
    } catch (error) {
      console.error("Erro ao editar link:", error);
    }
  };

  const handleApproveLink = async (id) => {
    if (!token) return;

    try {
      await approveLink(id, token);
      const updatedLinks = links.map(link => link.id === id ? { ...link, approved: true } : link);
      setLinks(updatedLinks);
    } catch (error) {
      console.error("Erro ao aprovar link:", error);
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
          <AddLink url={url} setUrl={setUrl} handleAddLink={handleAddLink} />
        )}

        <List>
          {links.map((link) => (
            <LinkItem
              key={link.id}
              link={link}
              user={user}
              handleDeleteLink={handleDeleteLink}
              handleApproveLink={handleApproveLink}
              handleEditLink={handleEditLink}
            />
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
}

export default Links;
