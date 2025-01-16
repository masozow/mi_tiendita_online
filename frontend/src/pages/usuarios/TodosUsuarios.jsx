import React, { useEffect, useReducer, useState } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";
import { useNavigate } from "react-router-dom";
import { useDynamicMutation } from "../../hooks/useDynamicMutation";
import snackbarReducer from "../../store/snackBarReducer";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const TodosUsuarios = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);

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

  const handleEdit = (id) => {
    navigate(`/usuario/${id}`);
  };

  const handleDelete = async (usuarioId) => {
    try {
      const resultado = await mutateAsync({
        URL: `/api/usuarios/${usuarioId}`,
      });
      console.log("Response:", resultado);
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

  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
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
      <SnackbarAlert
        snackbarState={snackbarState}
        onClose={handleSnackbarClose}
      />
    </TableContainer>
  );
};

export default TodosUsuarios;
