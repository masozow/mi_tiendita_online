import React, { useEffect, useState, useReducer } from "react";
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
import { useQueryHook } from "../../hooks/useQueryHook";
import { useDynamicMutation } from "../../hooks/useDynamicMutation";
import { formatoMoneda } from "../../utils/carritoFunctions";
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";
import snackbarReducer from "../../store/snackBarReducer";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import { useNavigate } from "react-router-dom";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const TablaOrdenesAcciones = ({
  queryKey,
  queryURL,
  mutateMethod,
  mutateURL,
  accionBoton,
  etiquetaBoton,
  colorBoton,
  tituloDialogo,
  mensajeDialogo,
  navigateURL,
  tituloTabla,
  funcionFiltro,
}) => {
  const navigate = useNavigate();
  const [filas, setFilas] = useState([]);

  const { data, isLoading, error } = useQueryHook(queryKey, queryURL);
  const { mutateAsync } = useDynamicMutation(mutateMethod);

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
      const datosFiltrados = funcionFiltro
        ? funcionFiltro(data.data)
        : data.data;
      setFilas(datosFiltrados);
    }
  }, [data, funcionFiltro]);

  const handleAction = async (ordenId) => {
    try {
      const response = await mutateAsync({
        URL: mutateURL(ordenId),
        data: { idEstado: accionBoton.idEstado },
      });

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
        message: `Error al realizar la acción: ${error.message}`,
        severity: "error",
      });
    }
  };

  const handleRowClick = (ordenId) => {
    navigate(navigateURL(ordenId));
  };

  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <TableContainer>
      <Table sx={{ minWidth: "100%" }} aria-label={tituloTabla}>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={13}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {tituloTabla}
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
                {accionBoton.condicion(fila.ID_ESTADO) && (
                  <Dialogo
                    onConfirm={() => handleAction(fila.ID)}
                    triggerButton={
                      <Button
                        aria-label={etiquetaBoton}
                        variant="contained"
                        color={colorBoton}
                        onClick={(e) => e.stopPropagation()}>
                        {etiquetaBoton}
                      </Button>
                    }
                    titulo={tituloDialogo}
                    mensaje={mensajeDialogo(fila.ID)}
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

export default TablaOrdenesAcciones;
