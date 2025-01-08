import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import snackbarReducer from "../../store/snackBarReducer";
import { useCustomMutation } from "../../hooks/useLoginMutation";
import { useAuth } from "../../store/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../../utils/yupSchemas";
import onSubmit from "../../utils/onSubmit";
import getFieldErrorProps from "../../utils/getFieldErrorProps";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import SelectCustomControlled from "../../components/ResponsiveDrawer/SelectCustomControlled";

const AgregarUsuario = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(1);
  const [selectedRol, setSelectedRol] = useState(1);

  const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
    open: false,
    message: "",
    severity: "success",
  });
  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const defaultValues =
    selectedRol === 1
      ? {
          correo: "",
          nombre: "",
          password: "",
          confirmarContrasena: "",
          telefono: "",
          fechaNacimiento: "",
          idEstado: 1,
          idRol: 1,
          razonSocial: "",
          direccion: "",
        }
      : {
          correo: "",
          nombre: "",
          password: "",
          confirmarContrasena: "",
          telefono: "",
          fechaNacimiento: "",
          idEstado: 1,
          idRol: 1,
        };

  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      selectedRol === 1
        ? schemas.usuarioClienteSchema
        : schemas.usuarioOperadorSchema
    ),
    mode: "onChange",
    defaultValues,
  });

  const handleFormSubmit = (formData) => {
    if (selectedRol === 1) {
      const clienteData = {
        ...formData,
        razonSocial: formData.nombre,
      };
      onSubmit(
        clienteData,
        setIsLoading,
        dispatchSnackbar,
        mutateAsyncCliente,
        () => {
          setSelectedEstado(1);
          setSelectedRol(1);
          reset();
          setFocus("nombre");
        }
      );
    } else {
      onSubmit(
        formData,
        setIsLoading,
        dispatchSnackbar,
        mutateAsyncOperador,
        () => {
          setSelectedEstado(1);
          setSelectedRol(1);
          reset();
          setFocus("nombre");
        }
      );
    }
  };

  const { mutateAsync: mutateAsyncCliente } = useCustomMutation(
    "/api/usuarios/cliente",
    "POST"
  );
  const { mutateAsync: mutateAsyncOperador } = useCustomMutation(
    "/api/usuarios/operador",
    "POST"
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        px: { xs: "1rem", md: "2rem" },
        py: 0,
        my: 0,
        minWidth: "100%",
      }}>
      <Typography variant="h5" sx={{ mb: "1rem" }} align="center">
        Crear nuevo usuario
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Stack spacing={2} width="100%" direction="column">
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
                  autoFocus
                  {...getFieldErrorProps("nombre", errors)}
                />
              )}
            />
          </Stack>
          <Stack spacing={2} direction={isSmallScreen ? "column" : "row"}>
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
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("correo", errors)}
                />
              )}
            />
          </Stack>

          <Stack
            spacing={2}
            width="100%"
            direction={isSmallScreen ? "column" : "row"}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("password", errors)}
                />
              )}
            />
            <Controller
              name="confirmarContrasena"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirmar Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("confirmarContrasena", errors)}
                />
              )}
            />
          </Stack>
          <Stack
            spacing={2}
            width="100%"
            direction={isSmallScreen ? "column" : "row"}>
            <Controller
              name="fechaNacimiento"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha de Nacimiento"
                  type="date"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("fechaNacimiento", errors)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            />
          </Stack>
          <Stack
            spacing={2}
            width="100%"
            direction={isSmallScreen ? "column" : "row"}>
            <Controller
              name="idEstado"
              control={control}
              render={({ field }) => (
                <SelectCustomControlled
                  {...field}
                  label="Estado"
                  handleSelectionChange={(value) => {
                    setSelectedEstado(value);
                    field.onChange(value);
                  }}
                  id="estado"
                  incomingStateValue={selectedEstado}
                  queryKey="listEstados"
                  URL="/api/estados/"
                  errors={errors}
                  fieldName="idEstado"
                />
              )}
            />
            <Controller
              name="idRol"
              control={control}
              render={({ field }) => (
                <SelectCustomControlled
                  {...field}
                  label="Rol"
                  handleSelectionChange={(value) => {
                    setSelectedRol(value);
                    field.onChange(value);
                  }}
                  id="rol"
                  incomingStateValue={selectedRol}
                  queryKey="listRoles"
                  URL="/api/roles/"
                  errors={errors}
                  fieldName="idRol"
                />
              )}
            />
          </Stack>
          {selectedRol === 1 && (
            <Stack spacing={2} width="100%">
              <Controller
                name="razonSocial"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Razón Social"
                    variant="outlined"
                    fullWidth
                    {...getFieldErrorProps("razonSocial", errors)}
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
            </Stack>
          )}
          <Stack
            spacing={2}
            width="100%"
            direction="row"
            justifyContent="flex-end">
            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Crear Usuario"}
            </Button>
          </Stack>
        </Stack>
      </form>
      <SnackbarAlert
        snackbarState={snackbarState}
        onClose={handleSnackbarClose}
      />
    </Container>
  );
};

export default AgregarUsuario;
