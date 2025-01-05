import React, { useState, useReducer } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext.jsx";
import schema from "../../utils/yupSchemas.js";
import SnackbarAlert from "../../components/Login/SnackBarAlert.jsx";
import onSubmit from "../../utils/onSubmit.js";
import snackbarReducer from "../../store/snackBarReducer.js";
import getFieldErrorProps from "../../utils/getFieldErrorProps.js";
import { useShoppingCart } from "../../store/ShoppingCartContext";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import { useQueryHook } from "../../hooks/useQueryHook";

const NuevaOrden = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartState } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useQueryHook(
    "obtenerClientePorIDUsuario",
    `/api/clientes/idUsuario/${user?.ID}`
  );

  const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
    open: false,
    message: "",
    severity: "success",
  });

  const theme = useTheme();
  const { isSmallScreen } = breakPointsFromTheme(theme);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.ordenSchema),
    mode: "onChange",
  });

  if (isDataLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  if (data?.data && data.data.length > 0) {
    const cliente = data.data[0];
    setValue("nombre", cliente.RAZON_SOCIAL);
    setValue("direccion", cliente.DIRECCION_ENTREGA);
    setValue("telefono", ""); // Assuming you have a way to get the phone number
    setValue("correo", ""); // Assuming you have a way to get the email
    setValue("fechaEntrega", ""); // Assuming you have a way to get the delivery date
    setValue("total", 0); // Assuming you have a way to calculate the total
    setValue("idEstado", cliente.ID_ESTADO);
    setValue("idCliente", cliente.ID);
  }

  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  const handleFormSubmit = (formData) => {
    const orderData = {
      ...formData,
      detalle: cartState.map((item) => ({
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal: item.subtotal,
        idProducto: item.idProducto,
      })),
    };

    onSubmit(
      orderData,
      setIsLoading,
      dispatchSnackbar,
      async (data) => {
        const response = await axios.post("/api/ordenes", data);
        return response.data;
      },
      () => {
        navigate("/ordenes/historial");
      }
    );
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: "1rem", md: "2rem" },
        flexGrow: 1,
      }}>
      <Typography variant="h5" sx={{ mb: "1rem" }}>
        Crear Nueva Orden
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Stack spacing={2} width="100%">
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                variant="outlined"
                fullWidth
                {...getFieldErrorProps("nombre", errors)}
              />
            )}
          />
          <Controller
            name="direccion"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dirección"
                variant="outlined"
                fullWidth
                {...getFieldErrorProps("direccion", errors)}
              />
            )}
          />
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
            <Controller
              name="telefono"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("telefono", errors)}
                />
              )}
            />
            <Controller
              name="correo"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo"
                  type="email"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("correo", errors)}
                />
              )}
            />
            <Controller
              name="fechaEntrega"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de Entrega"
                  type="date"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("fechaEntrega", errors)}
                />
              )}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}>
            {isLoading ? "Cargando..." : "Crear Orden"}
          </Button>
        </Stack>
      </form>

      <SnackbarAlert
        snackbarState={snackbarState}
        onClose={handleSnackbarClose}
      />
    </Container>
  );
};

export default NuevaOrden;
