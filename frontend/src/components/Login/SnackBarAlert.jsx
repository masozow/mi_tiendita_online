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
        {snackbarState?.message
          ? typeof snackbarState.message === "string"
            ? snackbarState.message.split(".")[0]
            : JSON.stringify(message)
          : ""}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
