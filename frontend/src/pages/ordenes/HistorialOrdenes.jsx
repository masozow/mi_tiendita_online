import React, { useEffect, useState, useReducer } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { useAuth } from "../../store/AuthContext";
import { formatoMoneda } from "../../utils/carritoFunctions";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";
import { useDynamicMutation } from "../../hooks/useDynamicMutation";
import snackbarReducer from "../../store/snackBarReducer";
import SnackbarAlert from "../../components/Login/SnackBarAlert";

const HistorialOrdenes = () => {
  const [filas, setFilas] = useState([]);
  const [operador, setOperador] = useState(null);
  const { user } = useAuth();
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const { data, isLoading, error } = useQueryHook(
    "todasOrdenes",
    "/api/ordenes/"
  );

  const {
    data: operadorData,
    isLoading: isOperadorLoading,
    error: operadorError,
  } = useQueryHook("operadorPorUsuario", `/api/operadores/usuario/${user?.ID}`);

  const { mutateAsync } = useDynamicMutation("PUT");

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
      const filteredData = data.data.filter((order) => order.ID_ESTADO === 4);
      setFilas(filteredData);
    }
  }, [data]);

  useEffect(() => {
    console.log("operadorData", operadorData);
    if (operadorData?.data) {
      setOperador(operadorData.data);
    }
  }, [operadorData]);

  if (isLoading || isOperadorLoading)
    return <Typography>Cargando...</Typography>;
  if (error || operadorError)
    return <div>Error: {error?.message || operadorError?.message}</div>;

  const handleEntregar = async (ordenId) => {
    try {
      const nuevoEstado = {
        idEstado: 7,
        idOperador: operador.ID,
      };
      console.log("nuevoEstado", nuevoEstado);
      console.log("Usuario: ", user);
      console.log("Operador ID:", operadorData.ID);
      await mutateAsync({ URL: `/api/ordenes/${ordenId}`, data: nuevoEstado });
      dispatchSnackbar({
        type: "OPEN",
        message: "Orden entregada exitosamente",
        severity: "success",
      });
      const { data: newData } = await useQueryHook(
        "todasOrdenes",
        "/api/ordenes/"
      );
      const filteredData = newData.data.filter(
        (order) => order.ID_ESTADO === 4
      );
      setFilas(filteredData);
    } catch (error) {
      dispatchSnackbar({
        type: "OPEN",
        message: "Error al entregar la orden",
        severity: "error",
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="tabla de órdenes entregadas">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={13}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Historial de Órdenes
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
            <TableRow key={fila.ID}>
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
                <Dialogo
                  onConfirm={() => handleEntregar(fila.ID)}
                  triggerButton={
                    <Button
                      aria-label="entregar"
                      variant="contained"
                      color="success">
                      Entregar
                    </Button>
                  }
                  titulo="Entregar Orden"
                  mensaje={`¿Desea entregar la orden ${fila.ID}?`}
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

export default HistorialOrdenes;
