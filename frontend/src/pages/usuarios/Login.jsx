import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../hooks/useLoginMutation.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../../utils/yupSchemas.js";
import { useAuth } from "../../store/AuthContext.jsx";
import { rolesDictionary } from "../../utils/rolesDictionary.js";

const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useLoginMutation();
  const { refetch } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.loginSchema),
    mode: "onChange",
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await mutateAsync(data); // Esperamos la respuesta de mutateAsync
      console.log("Response: ", response);
      const mensajeSolo = response.data?.toString().split("|")[0].trim();
      setSnackbarMessage(mensajeSolo || "¡Bienvenido!");
      setSeverity("success");
      setSnackbarOpen(true);
      await refetch(); // Re-fetch user data after login
      const user = response.data?.user;
      const userRole = parseInt(user?.ID_ROL, 10);
      setTimeout(() => {
        if (userRole === parseInt(rolesDictionary.Cliente, 10)) {
          navigate("/producto/catalogo/");
        } else if (userRole === parseInt(rolesDictionary.Operador, 10)) {
          navigate("/ordenes/historial/");
        } else {
          navigate("/");
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log("Error en onError: ", error);
      const errorMessage = error?.data || "Error desconocido";
      setSnackbarMessage(errorMessage);
      setSeverity("error");
      setSnackbarOpen(true);
      setIsLoading(false);
    }
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
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2}>
          <TextField
            id="email"
            name="email"
            label="Correo"
            type="email"
            variant="outlined"
            {...register("correo")}
            error={!!errors.correo}
            helperText={errors.correo?.message}
          />
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
