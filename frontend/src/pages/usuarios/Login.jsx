import React, { useState, useReducer } from "react";
import { TextField, Button, Stack, Typography, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "../../hooks/useLoginMutation.jsx";
import { useAuth } from "../../store/AuthContext.jsx";
import schema from "../../utils/yupSchemas.js";
import { rolesDictionary } from "../../utils/rolesDictionary.js";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import onLoginSubmit from "../../utils/onLoginSubmit.js";
import snackbarReducer from "../../store/snackBarReducer.js";
import getFieldErrorProps from "../../utils/getFieldErrorProps.js";

const Login = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useCustomMutation("/api/usuarios/login", "POST");
  const { refetch } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
    open: false,
    message: "",
    severity: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema.loginSchema),
    mode: "onChange",
  });

  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
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
      <Typography
        variant="h4"
        sx={{
          mb: "3rem",
          fontWeight: 300,
          fontFamily: "Roboto, sans-serif",
          color: "primaary.main",
        }}>
        Mi Tiendita Online
      </Typography>
      <Typography variant="h5" sx={{ mb: "1rem" }}>
        Iniciar sesión
      </Typography>
      <form
        onSubmit={handleSubmit((data) =>
          onLoginSubmit(
            data,
            setIsLoading,
            dispatchSnackbar,
            navigate,
            mutateAsync,
            refetch,
            rolesDictionary
          )
        )}
        noValidate>
        <Stack spacing={2}>
          <TextField
            id="email"
            name="email"
            label="Correo"
            type="email"
            variant="outlined"
            {...register("correo")}
            {...getFieldErrorProps("correo", errors)}
          />
          <TextField
            id="password"
            name="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            {...register("password")}
            {...getFieldErrorProps("password", errors)}
          />
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Iniciar sesión"}
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

export default Login;
