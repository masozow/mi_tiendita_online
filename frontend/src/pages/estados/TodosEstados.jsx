import React, { useEffect, useState, useReducer } from "react";
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

const TodosEstados = () => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);

  const { data, isLoading, error } = useQueryHook(
    `todosEstados_`,
    "/api/estados//?ACTIVO=2"
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
    navigate(`/estado/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const resultado = await mutateAsync({
        URL: `/api/estados/${id}`,
      });
      dispatchSnackbar({
        type: "OPEN",
        message: resultado.data,
        severity: resultado.success,
      });
      setFilas((prevFilas) => prevFilas.filter((fila) => fila.ID !== id));
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
      <Table sx={{ minWidth: "100%" }} aria-label="tabla de estados">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Estados
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell align="center">
              <b>Estado</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <TableRow key={fila.ID}>
              <TableCell>{fila.ID}</TableCell>
              <TableCell>{fila.NOMBRE}</TableCell>
              <TableCell align="center">
                <CustomChip
                  incomingLabel={fila.ACTIVO ? "Activo" : "Inactivo"}
                />
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
                  titulo="Eliminar estado"
                  mensaje={`¿Desea eliminar el estado ${fila.NOMBRE}?`}
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

export default TodosEstados;
