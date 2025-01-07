import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarAlert = ({ snackbarState, onClose }) => {
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={onClose} severity={snackbarState.severity}>
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
