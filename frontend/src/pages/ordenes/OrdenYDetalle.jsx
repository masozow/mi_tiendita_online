import { useState, useReducer, useEffect, useMemo } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  useTheme,
  TableContainer,
  TableRow,
  TableHead,
  Table,
  Divider,
  TableBody,
  TableCell,
} from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../store/AuthContext.jsx";
import schema from "../../utils/yupSchemas.js";
import SnackbarAlert from "../../components/Login/SnackBarAlert.jsx";
import onSubmit from "../../utils/onSubmit.js";
import snackbarReducer from "../../store/snackBarReducer.js";
import getFieldErrorProps from "../../utils/getFieldErrorProps.js";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  calcularTotal,
  formatoMoneda,
  handleClearCart,
  obtenerItemsCarrito,
} from "../../utils/carritoFunctions.js";
import { useCustomMutation } from "../../hooks/useLoginMutation.jsx";
import { useShoppingCart } from "../../store/ShoppingCartContext.jsx";

const OrdenYDetalle = () => {
  const [encabezado, setEncabezado] = useState([]);
  const [filas, setFilas] = useState([]);

  const params = useParams();

  const { data, isLoading, error } = useQueryHook(
    `ObtenerOrden_${params.ordenId}`,
    `/api/ordenes/${params.ordenId}`
  );
  const {
    data: dataDetalle,
    isLoading: isLoadingDetalle,
    error: errorDetalle,
  } = useQueryHook(
    `ObtenerOrdenDetalle_${params.ordenId}`,
    `/api/ordenes/detalle/${params.ordenId}`
  );

  const theme = useTheme();
  const { isSmallScreen } = breakPointsFromTheme(theme);

  useEffect(() => {
    if (
      data?.data &&
      data.data.length > 0 &&
      dataDetalle?.data &&
      dataDetalle.data.length > 0
    ) {
      setEncabezado(data.data[0]);
      setFilas(dataDetalle.data);
      console.log("Data: ", data.data);
    }
  }, [data, dataDetalle]);

  return isLoading && isLoadingDetalle ? (
    <Typography>Cargando...</Typography>
  ) : error || errorDetalle ? (
    <div>
      Error: {error.message} || {errorDetalle.message}
    </div>
  ) : (
    <Container
      sx={{
        px: { xs: "1rem", md: "2rem" },
        minWidth: "100%",
      }}>
      <Typography variant="h5" sx={{ mb: "1rem" }} align="center">
        <b>Detalles de la Orden {params.ordenId}</b>
      </Typography>
      <Divider />
      <Stack direction="column" justifyContent="space-between">
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          justifyContent="space-between">
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              ID Cliente:
            </Typography>
            <Typography variant="h5" sx={{ ml: "1rem", py: "0.5rem" }}>
              {encabezado.ID_CLIENTE}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              ID Operador:
            </Typography>
            <Typography variant="h5" sx={{ ml: "1rem", py: "0.5rem" }}>
              {encabezado.ID_OPERADOR}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}
            my={"1rem"}>
            <Typography variant="h6" fontWeight={"bold"}>
              TOTAL:
            </Typography>
            <Typography
              variant="h5"
              sx={{ ml: "1rem", p: "0.5rem", borderRadius: "0.5rem" }}
              backgroundColor="primary.main"
              color="primary.contrastText">
              {formatoMoneda(encabezado.TOTAL)}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          justifyContent="space-between">
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              Fecha:
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
              {encabezado.FECHA_CREACION}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              Teléfono:
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
              {encabezado.TELEFONO}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              E-mail:
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
              {encabezado.CORREO}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction={isSmallScreen ? "column" : "row"}
          justifyContent="space-between">
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "33.3333%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              Nombre:
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
              {encabezado.NOMBRE}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems={"baseline"}
            minWidth={isSmallScreen ? "100%" : "66.6666%"}>
            <Typography variant="h6" fontWeight={"bold"}>
              Dirección:
            </Typography>
            <Typography variant="subtitle1" sx={{ ml: "1rem" }}>
              {encabezado.DIRECCION}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
      </Stack>
      {/* <p>{JSON.stringify(encabezado, null, 2)}</p>
      <p>{JSON.stringify(filas, null, 2)}</p> */}
      <TableContainer sx={{ mt: "2rem" }}>
        <Divider />
        <Table>
          <TableHead>
            <TableRow colSpan={7}>
              <TableCell>
                <b>Cantidad</b>
              </TableCell>
              <TableCell>
                <b>Código</b>
              </TableCell>
              <TableCell>
                <b>Marca</b>
              </TableCell>
              <TableCell>
                <b>Categoría</b>
              </TableCell>
              <TableCell>
                <b>Descripción</b>
              </TableCell>
              <TableCell>
                <b>Precio Unitario</b>
              </TableCell>
              <TableCell>
                <b>Subtotal</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filas.map((fila) => (
              <TableRow key={fila.ID}>
                <TableCell>{fila.CANTIDAD}</TableCell>
                <TableCell>{fila.CODIGO_PRODUCTO}</TableCell>
                <TableCell>{fila.MARCA}</TableCell>
                <TableCell>{fila.CATEGORIA}</TableCell>
                <TableCell>{fila.PRODUCTO}</TableCell>
                <TableCell>{formatoMoneda(fila.PRECIO)}</TableCell>
                <TableCell>{formatoMoneda(fila.SUBTOTAL)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrdenYDetalle;
