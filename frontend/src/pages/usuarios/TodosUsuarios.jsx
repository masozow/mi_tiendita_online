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
import { useAuth } from "../../store/AuthContext";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";
import { useNavigate } from "react-router-dom";
import { useDynamicMutation } from "../../hooks/useDynamicMutation";
import snackbarReducer from "../../store/snackBarReducer";

const TodosUsuarios = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);
  const { user } = useAuth();
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const { data, isLoading, error } = useQueryHook(
    "todosUsuarios",
    "/api/usuarios/"
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

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (id) => {
    navigate(`/usuario/${id}`);
  };

  const handleDelete = async (usuarioId) => {
    try {
      const resultado = await mutateAsync({
        URL: `/api/usuarios/${usuarioId}`,
      });
      dispatchSnackbar({
        type: "OPEN",
        message: resultado.data,
        severity: resultado.success,
      });
      setFilas((prevFilas) =>
        prevFilas.filter((fila) => fila.ID !== usuarioId)
      );
    } catch (error) {
      dispatchSnackbar({
        type: "OPEN",
        message: error.message,
        severity: "error",
      });
    }
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: "100%" }} aria-label="tabla de usuarios">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={10}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Usuarios
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Correo</b>
            </TableCell>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell>
              <b>Teléfono</b>
            </TableCell>
            <TableCell>
              <b>Fecha de Nacimiento</b>
            </TableCell>
            <TableCell>
              <b>Rol</b>
            </TableCell>
            <TableCell>
              <b>Estado</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <TableRow key={fila.ID}>
              <TableCell>{fila.ID}</TableCell>
              <TableCell>{fila.CORREO}</TableCell>
              <TableCell>{fila.NOMBRE}</TableCell>
              <TableCell>{fila.TELEFONO}</TableCell>
              <TableCell>{fila.FECHA_NACIMIENTO}</TableCell>
              <TableCell>{fila.NOMBRE_ROL}</TableCell>
              <TableCell>
                <CustomChip incomingLabel={fila.ID_ESTADO} />
              </TableCell>
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
                  titulo="Eliminar usuario"
                  mensaje={`¿Desea eliminar al usuario ${fila.NOMBRE}?`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodosUsuarios;
