import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

const ProtectedRoute = ({ roles }) => {
  const { user, isLoading, error } = useAuth();

  if (isLoading) return <p>Cargando...</p>;

  if (error || !user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.ID_ROL)) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
