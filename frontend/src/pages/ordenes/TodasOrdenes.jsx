import { useEffect, useReducer, useState } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { formatoMoneda } from "../../utils/carritoFunctions";
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";
import snackbarReducer from "../../store/snackBarReducer";
import { useDynamicMutation } from "../../hooks/useDynamicMutation";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import { useNavigate } from "react-router-dom";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const TodasOrdenes = () => {
  const [filas, setFilas] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQueryHook(
    "todasOrdenes",
    "/api/ordenes/"
  );

  const { mutateAsync } = useDynamicMutation("PATCH");

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

  // const handleEdit = (orderId) => {
  //   console.log("Editar orden con ID:", orderId);
  // };

  const handleDelete = async (ordenId) => {
    try {
      const nuevoEstado = {
        idEstado: 4,
      };

      const response = await mutateAsync({
        URL: `/api/ordenes/cancel/${ordenId}`,
        data: nuevoEstado,
      });
      console.log("Response:", response);
      dispatchSnackbar({
        type: "OPEN",
        message: response.data,
        severity: response.success,
      });

      if (response.success !== "error") {
        setFilas((prevFilas) =>
          prevFilas.filter((fila) => fila.ID !== ordenId)
        );
      }
    } catch (error) {
      dispatchSnackbar({
        type: "OPEN",
        message: "Error al cancelar la orden: " + error.message,
        severity: "error",
      });
    }
  };
  const handleRowClick = (ordenId) => {
    navigate(`/ordenes/${ordenId}`);
  };
  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <TableContainer>
      <Table sx={{ minWidth: "100%" }} aria-label="tabla de órdenes">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={13}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Órdenes
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Fecha Creación</b>
            </TableCell>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell>
              <b>Dirección</b>
            </TableCell>
            <TableCell>
              <b>Teléfono</b>
            </TableCell>
            <TableCell>
              <b>Fecha Entrega</b>
            </TableCell>
            <TableCell>
              <b>Total</b>
            </TableCell>
            <TableCell>
              <b>ID Estado</b>
            </TableCell>
            <TableCell>
              <b>ID Cliente</b>
            </TableCell>
            <TableCell>
              <b>ID Operador</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <TableRow
              key={fila.ID}
              hover
              onClick={() => handleRowClick(fila.ID)}
              style={{ cursor: "pointer" }}>
              <TableCell>{fila.ID}</TableCell>
              <TableCell>{fila.FECHA_CREACION}</TableCell>
              <TableCell>{fila.NOMBRE}</TableCell>
              <TableCell>{fila.DIRECCION}</TableCell>
              <TableCell>{fila.TELEFONO}</TableCell>
              <TableCell>{fila.FECHA_ENTREGA}</TableCell>
              <TableCell>{formatoMoneda(fila.TOTAL)}</TableCell>
              <TableCell align="center">
                <CustomChip incomingLabel={fila.ID_ESTADO} />
              </TableCell>
              <TableCell>{fila.ID_CLIENTE}</TableCell>
              <TableCell>{fila.ID_OPERADOR}</TableCell>
              <TableCell align="center">
                {/* <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(fila.ID)}>
                  <EditIcon />
                </IconButton> */}
                {fila.ID_ESTADO !== 4 &&
                  fila.ID_ESTADO !== 2 &&
                  fila.ID_ESTADO !== 7 && (
                    <Dialogo
                      onConfirm={() => handleDelete(fila.ID)}
                      triggerButton={
                        <Button
                          aria-label="eliminar"
                          variant="contained"
                          color="error">
                          Eliminar
                        </Button>
                      }
                      titulo="Eliminar Orden"
                      mensaje={`¿Desea eliminar la orden ${fila.ID}?`}
                    />
                  )}
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

export default TodasOrdenes;
