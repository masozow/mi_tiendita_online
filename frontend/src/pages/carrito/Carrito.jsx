import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useShoppingCart } from "../../store/ShoppingCartContext";
import { useAuth } from "../../store/AuthContext";
import { Typography } from "@mui/material";
import Dialogo from "../../components/Dialogo/Dialogo";
import SnackBarAlert from "../../components/SnackBarAlert";
import {
  formatoMoneda,
  calcularTotal,
  obtenerItemsCarrito,
  handleRemoveItem,
  handleClearCart,
} from "../../utils/carritoFunctions";

const Carrito = () => {
  const [filas, setFilas] = useState([]);
  const { removeFromCart, dispatch } = useShoppingCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      obtenerItemsCarrito(user.ID, setFilas);
    }
  }, [user]);

  const totalFactura = calcularTotal(filas);

  const handleClearCartAndRedirect = async () => {
    await handleClearCart({
      userId: user?.ID,
      dispatch: dispatch,
      setFilas: setFilas,
    });
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: "10rem" }}
        aria-label="tabla de carrito de compras">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={6}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Carrito
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <b>Descripción</b>
            </TableCell>
            <TableCell align="center">
              <b>Cant.</b>
            </TableCell>
            <TableCell align="right">
              <b>Precio</b>
            </TableCell>
            <TableCell align="right">
              <b>Sub-total</b>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <TableRow key={fila.idProducto}>
              <TableCell>
                <ImageWithFallback
                  src={`${import.meta.env.VITE_STATIC_URI + fila.foto}`}
                  fallbackSrc="/Image-not-found.png"
                  alt={fila.nombre}
                  width="50px"
                  height="50px"
                  objectFit="cover"
                />
              </TableCell>
              <TableCell>{fila.nombre}</TableCell>
              <TableCell align="center">{fila.cantidad}</TableCell>
              <TableCell align="right">{formatoMoneda(fila.precio)}</TableCell>
              <TableCell align="right">
                {formatoMoneda(fila.subtotal)}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    handleRemoveItem(fila.idProducto, removeFromCart, setFilas)
                  }>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell
              align="right"
              colSpan={3}
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              <b>Total</b>
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
              <b>{formatoMoneda(totalFactura)}</b>
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} />
            <TableCell align="right">
              <Dialogo onConfirm={handleClearCartAndRedirect} />
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/ordenes/nueva">
                Comprar
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <SnackBarAlert
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        severity="success"
        message="Carrito borrado con éxito"
      />
    </TableContainer>
  );
};

export default Carrito;
