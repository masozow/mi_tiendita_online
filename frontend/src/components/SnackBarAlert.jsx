import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ open, message, severity, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}>
    <Alert onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
