import React, { useEffect, useReducer, useState } from "react";
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
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";
import { useNavigate } from "react-router-dom";
import { useDynamicMutation } from "../../hooks/useDynamicMutation";
import snackbarReducer from "../../store/snackBarReducer";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const TodosProductos = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);
  const { user } = useAuth();
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const { data, isLoading, error, refetch } = useQueryHook(
    "todosProductos",
    "/api/productos/"
  );
  const { mutateAsync } = useDynamicMutation("DELETE");

  const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
    open: false,
    message: "",
    severity: "success",
  });

  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  useEffect(() => {
    if (data?.data) {
      setFilas(data.data);
    }
  }, [data]);

  const handleEdit = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const handleDelete = async (id) => {
    try {
      const resultado = await mutateAsync({
        URL: `/api/productos/${id}`,
      });
      console.log("Response:", resultado);
      dispatchSnackbar({
        type: "OPEN",
        message: resultado.data,
        severity: resultado.success,
      });
      // setFilas((prevFilas) => prevFilas.filter((fila) => fila.ID !== id));
      refetch();
    } catch (error) {
      dispatchSnackbar({
        type: "OPEN",
        message: error.message,
        severity: "error",
      });
    }
  };

  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <TableContainer>
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
          {filas.map((fila) => (
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
              <TableCell align="center">
                <CustomChip incomingLabel={fila.ID_ESTADO} />
              </TableCell>
              <TableCell align="center">{fila.NOMBRE_MARCA}</TableCell>
              <TableCell align="center">{fila.NOMBRE_CATEGORIA}</TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(fila.ID)}>
                  <EditIcon />
                </IconButton>
                <Dialogo
                  onConfirm={() => handleDelete(fila.ID)}
                  triggerButton={
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  titulo="Eliminar producto"
                  mensaje={`¿Desea eliminar el producto ${fila.NOMBRE}?`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SnackbarAlert
        snackbarState={snackbarState}
        onClose={handleSnackbarClose}
      />
    </TableContainer>
  );
};

export default TodosProductos;
