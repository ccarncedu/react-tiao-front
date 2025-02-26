import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", { email, password });
      setToken(response.data.token);
      setUser(response.data.user); 
      return true;
    } catch (error) {
      console.error("Erro ao logar", error);
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/api/register", { email, password });
      setToken(response.data.token);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Erro ao registrar", error);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null); 
  };

  return <AuthContext.Provider value={{ token, user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;