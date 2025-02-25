import axios from "axios";

const API_URL = "http://localhost:8000/api/links";

export const fetchLinks = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar links:", error);
    throw error;
  }
};

export const addLink = async (title, url) => {
  try {
    await axios.post(API_URL, { title, url }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  } catch (error) {
    console.error("Erro ao adicionar link:", error);
    throw error;
  }
};

export const deleteLink = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  } catch (error) {
    console.error("Erro ao deletar link:", error);
    throw error;
  }
};