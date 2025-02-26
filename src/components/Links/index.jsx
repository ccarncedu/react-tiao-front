import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  List,
  Paper,
  Pagination
} from "@mui/material";
import { fetchLinks, addLink, deleteLink } from "../../services/links.service";
import { AuthContext } from "../../providers/AuthProvider";
import AddLink from "./components/AddLink";
import LinkItem from "./components/List";

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
          <AddLink url={url} setUrl={setUrl} handleAddLink={handleAddLink} />
        )}

        <List>
          {links.map((link, index) => (
            <LinkItem key={link.id} link={link} user={user} handleDeleteLink={handleDeleteLink} />
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