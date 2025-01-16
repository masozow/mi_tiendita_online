import { Typography } from "@mui/material";
import React from "react";

const NoExiste = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}>
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">Página no encontrada</Typography>
    </div>
  );
};

export default NoExiste;
