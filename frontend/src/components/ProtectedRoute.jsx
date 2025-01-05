import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

const ProtectedRoute = ({ roles }) => {
  const { user, isLoading, error } = useAuth();

  console.log("ProtectedRoute - isLoading:", isLoading);
  console.log("ProtectedRoute - user:", user);
  console.log("ProtectedRoute - error:", error);
  console.log(
    "ProtectedRoute - error && error.status === 401:",
    error && error.status === 401
  );
  console.log(
    "ProtectedRoute - roles && !roles.includes(user.ID_ROL):",
    roles && !roles.includes(user?.ID_ROL)
  );

  if (isLoading) return <p>Cargando...</p>;

  if (error && error.status === 401) return <Navigate to="/login" />;

  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.ID_ROL)) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
