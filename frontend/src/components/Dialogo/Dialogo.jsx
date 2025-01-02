import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const Dialogo = ({ onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    handleCloseDialog();
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
        Cancelar
      </Button>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Borrar carrito"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está segur@ de borrar su carrito ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="contained"
            color="secondary">
            No
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            variant="contained"
            autoFocus>
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dialogo;
