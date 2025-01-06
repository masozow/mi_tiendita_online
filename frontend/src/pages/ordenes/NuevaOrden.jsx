import { useState, useReducer, useEffect, useMemo } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  useTheme,
} from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
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
  handleClearCart,
  obtenerItemsCarrito,
} from "../../utils/carritoFunctions.js";
import { useCustomMutation } from "../../hooks/useLoginMutation.jsx";
import { useShoppingCart } from "../../store/ShoppingCartContext.jsx";

const NuevaOrden = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { removeFromCart, dispatch } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const [filas, setFilas] = useState([]);
  const [total, setTotal] = useState(0);

  const { mutateAsync } = useCustomMutation("/api/ordenes", "POST");

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
  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  useEffect(() => {
    const fetchItems = async () => {
      if (user) {
        await obtenerItemsCarrito(user.ID, setFilas);
      }
    };
    fetchItems();
  }, [user]);

  useEffect(() => {
    if (filas && filas.length > 0) {
      setTotal(calcularTotal(filas));
    } else {
      setTotal(0);
    }
  }, [filas]);

  const theme = useTheme();
  const { isSmallScreen } = breakPointsFromTheme(theme);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.ordenSchema),
    mode: "onChange",
    defaultValues: {
      total: "",
      fechaEntrega: "",
      idCliente: "",
      correo: "",
      telefono: "",
      direccion: "",
      nombre: "",
    },
  });
  const handleClearFields = () => {
    reset({
      total: "",
      fechaEntrega: "",
      idCliente: "",
      correo: "",
      telefono: "",
      direccion: "",
      nombre: "",
    });
  };
  const handleClearCartAndRedirect = async () => {
    handleClearFields();
    await handleClearCart({
      userId: user?.ID,
      dispatch: dispatch,
      setFilas: setFilas,
      cb: () => {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      },
    });
  };
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const cliente = data.data[0];
      const datosCliente = {
        nombre: cliente.RAZON_SOCIAL,
        direccion: cliente.DIRECCION_ENTREGA,
        telefono: cliente.TELEFONO,
        correo: cliente.CORREO,
        fechaEntrega: new Date().toISOString().split("T")[0].split(" ")[0],
        total: total,
        idEstado: 3,
        idCliente: cliente.ID,
      };
      reset(datosCliente);
    }
  }, [data, total]);

  const handleFormSubmit = (formData) => {
    console.log("Form data: ", formData);
    console.log(
      "Fecha: ",
      new Date().toISOString().split("T")[0].split(" ")[0]
    );
    const ordenData = {
      idCliente: parseInt(formData.idCliente, 10),
      idEstado: formData.idEstado,
      total: formData.total,
      fechaEntrega: new Date(formData.fechaEntrega).toISOString(),
      correo: formData.correo,
      telefono: formData.telefono,
      direccion: formData.direccion,
      nombre: formData.nombre,
      detalle: filas.map((item) => ({
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal: item.subtotal,
        idProducto: item.idProducto,
      })),
    };
    console.log("Orden data: ", ordenData);
    onSubmit(
      ordenData,
      setIsLoading,
      dispatchSnackbar,
      mutateAsync,
      async () => {
        console.log("Orden data: ", ordenData);
        await handleClearCartAndRedirect();
      }
    );
  };

  return isDataLoading ? (
    <Typography>Cargando...</Typography>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
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
            name="idCliente"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="ID Cliente"
                variant="outlined"
                fullWidth
                {...getFieldErrorProps("idCliente", errors)}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            )}
          />
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
          </Stack>
          <Stack direction={isSmallScreen ? "column" : "row"} spacing={2}>
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
            <Controller
              name="total"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Total"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("total", errors)}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
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
