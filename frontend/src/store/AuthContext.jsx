import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryHook } from "../hooks/useQueryHook.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenData, setTokenData] = useState(null);
  const [isWaiting, setIsWaiting] = useState(true);
  const { data, isLoading, error, refetch } = useQueryHook(
    "tokenData",
    "/api/usuarios/datos-token"
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setTokenData(data);
      setIsWaiting(false);
    }
  }, [data]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsWaiting(false);
    }, 5000); // Maximum wait time of 5 seconds

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (
      !isLoading &&
      tokenData === null &&
      location.pathname !== "/login" &&
      !isWaiting
    ) {
      navigate("/login");
    }
  }, [isLoading, tokenData, error, navigate, location.pathname, isWaiting]);

  useEffect(() => {
    if (error && error.status === 401) {
      navigate("/login");
    }
  }, [error, navigate]);

  if ((isLoading || isWaiting) && location.pathname !== "/login") {
    return <p>Cargando...</p>;
  }

  if (error && error.status !== 401 && location.pathname !== "/login") {
    console.error("Error fetching token data:", error.message, error);
    return <div>Error loading user data: {error.message}</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user: tokenData?.data, isLoading, error, refetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
