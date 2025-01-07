import React, { useEffect, useState } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useAuth } from "../../store/AuthContext";
import { formatoMoneda } from "../../utils/carritoFunctions";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";

const TodosProductos = () => {
  const [filas, setFilas] = useState([]);
  const { user } = useAuth();
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const { data, isLoading, error } = useQueryHook(
    "todosProductos",
    "/api/productos/"
  );

  useEffect(() => {
    if (data?.data) {
      setFilas(data.data);
    }
  }, [data]);

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (productId) => {
    console.log("Edit product with ID:", productId);
  };

  const handleDelete = (productId) => {
    console.log("Delete product with ID:", productId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="tabla de productos">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={11}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Productos
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell align="center">
              <b>Código</b>
            </TableCell>
            <TableCell align="center">
              <b>Stock</b>
            </TableCell>
            <TableCell align="right">
              <b>Costo</b>
            </TableCell>
            <TableCell align="right">
              <b>Precio</b>
            </TableCell>
            <TableCell align="center">
              <b>Estado</b>
            </TableCell>
            <TableCell align="center">
              <b>Marca</b>
            </TableCell>
            <TableCell align="center">
              <b>Categoría</b>
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas?.map((fila) => (
            <TableRow key={fila.ID}>
              <TableCell>
                <ImageWithFallback
                  src={`${import.meta.env.VITE_STATIC_URI + fila.FOTO}`}
                  fallbackSrc="/Image-not-found.png"
                  alt={fila.NOMBRE}
                  width="50px"
                  height="50px"
                  objectFit="cover"
                />
              </TableCell>
              <TableCell align="center">{fila.ID}</TableCell>
              <TableCell>{fila.NOMBRE}</TableCell>
              <TableCell align="center">{fila.CODIGO}</TableCell>
              <TableCell align="center">{fila.STOCK}</TableCell>
              <TableCell align="right">{formatoMoneda(fila.COSTO)}</TableCell>
              <TableCell align="right">{formatoMoneda(fila.PRECIO)}</TableCell>
              <TableCell align="center">{fila.NOMBRE_ESTADO}</TableCell>
              <TableCell align="center">{fila.NOMBRE_MARCA}</TableCell>
              <TableCell align="center">{fila.NOMBRE_CATEGORIA}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(fila.ID)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="edit"
                  onClick={() => handleDelete(fila.ID)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodosProductos;
