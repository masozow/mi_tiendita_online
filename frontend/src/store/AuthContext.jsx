import React, { createContext, useContext, useState, useEffect } from "react";
import { useTokenData } from "../hooks/useTokenData.jsx";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [tokenData, setTokenData] = useState(null);
  const { data, isLoading, error, refetch } = useTokenData();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setTokenData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!isLoading && !tokenData && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isLoading, tokenData, error, navigate, location.pathname]);

  useEffect(() => {
    if (error && error.status === 401) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading && location.pathname !== "/login") {
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
