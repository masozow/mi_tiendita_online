import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";
import { rolesDictionary } from "../utils/rolesDictionary.js";

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      navigate("/login");
    } else if (user.ID_ROL === rolesDictionary.Cliente) {
      navigate("/producto/catalogo");
    } else if (user.ID_ROL === rolesDictionary.Operador) {
      navigate("/ordenes/historial");
    } else {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <h1>Bienvenid@</h1>
    </div>
  );
};

export default Home;
