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
import ImageWithFallback from "../../components/ImageWithFallback";
import { getAllItems } from "../../utils/indexeddb";
import { useShoppingCart } from "../../store/ShoppingCartContext";
import { useAuth } from "../../store/AuthContext";
import { Typography } from "@mui/material";

const formatoMoneda = (num) =>
  `Q${num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;

const calcularSubtotal = (items) =>
  items.map(({ subtotal }) => subtotal).reduce((suma, i) => suma + i, 0);

const Carrito = () => {
  const [filas, setFilas] = useState([]);
  const { removeFromCart } = useShoppingCart();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const obtenerItemsCarrito = async () => {
        const items = await getAllItems(user.ID);
        setFilas(items);
      };

      obtenerItemsCarrito();
    }
  }, [user]);

  const handleRemoveItem = (idProducto) => {
    removeFromCart(idProducto);
    setFilas((prevFilas) =>
      prevFilas.filter((fila) => fila.idProducto !== idProducto)
    );
  };

  const subtotalFactura = calcularSubtotal(filas);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="tabla de resumen">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={6}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                <b>Carrito</b>
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
                  onClick={() => handleRemoveItem(fila.idProducto)}>
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
              <b>{formatoMoneda(subtotalFactura)}</b>
            </TableCell>
            <TableCell align="center">
              <Button variant="contained" color="primary">
                Comprar
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Carrito;
