import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [open, setOpen] = useState(!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setOpen(false);
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setOpen(true);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      const newToken = response.data.token;
      setToken(newToken);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return true;
    } catch (error) {
      console.error("Erro ao logar", error);
      return false;
    }
  };
  
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", { name, email, password });
      const newToken = response.data.token;
      setToken(newToken);
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      return true;
    } catch (error) {
      console.error("Erro ao registrar", error);
      return false;
    }
  };


  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, open, setOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;