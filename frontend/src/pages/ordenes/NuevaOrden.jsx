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

const NuevaOrden = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartState } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.ordenSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "Maria Gómez",
      direccion: "5 AVENIDA 3-45 ZONA 1, GUATEMALA, GUATEMALA",
      telefono: "584930128",
      correo: "MARIA.GOMEZ@EXAMPLE.COM",
      fechaEntrega: "2024-12-21",
      total: 20310.0,
      idEstado: 3,
      idCliente: user?.ID || 2,
      detalle: Array.isArray(cartState)
        ? cartState.map((item) => ({
            cantidad: item.cantidad,
            precio: item.precio,
            subtotal: item.subtotal,
            idProducto: item.idProducto,
          }))
        : [],
    },
  });

  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  const handleFormSubmit = (data) => {
    onSubmit(
      data,
      setIsLoading,
      dispatchSnackbar,
      async (data) => {
        const response = await fetch("/api/ordenes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        return response.json();
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
