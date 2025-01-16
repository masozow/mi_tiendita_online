import React, { useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, message, severity, onClose }) => {
  useEffect(() => {
    console.log("SnackbarAlert - message:", message);
  }, [message]);
  if (message?.toString().toLowerCase().includes("error")) {
    severity = "error";
  }
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={onClose} severity={severity}>
        {typeof message === "string" ? message : JSON.stringify(message)}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
