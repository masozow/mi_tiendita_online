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
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../../utils/yupSchemas";
import onSubmit from "../../utils/onSubmit";
import getFieldErrorProps from "../../utils/getFieldErrorProps";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import SelectCustomControlled from "../../components/ResponsiveDrawer/SelectCustomControlled";
import { useNavigate } from "react-router-dom";
import { rolesDictionary } from "../../utils/rolesDictionary";
import { id } from "yup-locales";

const FormUsuarios = ({ data, URL, httpMethod, submitMessage }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(data?.idEstado || 1);
  const [selectedRol, setSelectedRol] = useState(data?.idRol || 1);

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
    selectedRol === rolesDictionary.Cliente
      ? {
          idCliente: data?.idCliente || "",
          correo: data?.correo || "",
          nombre: data?.nombre || "",
          password: "",
          telefono: data?.telefono || "",
          fechaNacimiento: data?.fechaNacimiento || "",
          idEstado: data?.idEstado || 1,
          idRol: data?.idRol || 1,
          razonSocial: data?.razonSocial || "",
          direccion: data?.direccion || "",
        }
      : {
          correo: data?.correo || "",
          nombre: data?.nombre || "",
          password: "",
          telefono: data?.telefono || "",
          fechaNacimiento: data?.fechaNacimiento || "",
          idEstado: data?.idEstado || 1,
          idRol: data?.idRol || 1,
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

  const { mutateAsync: mutateAsyncCliente } = useCustomMutation(
    httpMethod === "POST" ? "/api/usuarios/cliente" : URL,
    httpMethod
  );
  const { mutateAsync: mutateAsyncOperador } = useCustomMutation(
    httpMethod === "POST" ? "/api/usuarios/operador" : URL,
    httpMethod
  );

  const handleFormSubmit = (formData) => {
    if (selectedRol === 1) {
      const clienteData = {
        ...formData,
        razonSocial: formData.razonSocial || formData.nombre,
      };
      console.log("Cliente data: ", clienteData);
      onSubmit(
        clienteData,
        setIsLoading,
        dispatchSnackbar,
        mutateAsyncCliente,
        () => {
          console.log("Cliente data: ", clienteData);
          setSelectedEstado(1);
          setSelectedRol(1);
          reset();
          setFocus("nombre");
          if (data) {
            navigate(-1);
          }
        }
      );
    } else {
      onSubmit(
        formData,
        setIsLoading,
        dispatchSnackbar,
        mutateAsyncOperador,
        () => {
          console.log("Operador data: ", formData);
          setSelectedEstado(1);
          setSelectedRol(1);
          reset();
          setFocus("nombre");
          if (data) {
            navigate(-1);
          }
        }
      );
    }
  };

  useEffect(() => {
    console.log("URL in form: ", URL);
  }, [URL]);

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
        {submitMessage}
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
                  slotProps={{
                    input: {
                      readOnly: data ? true : false,
                    },
                  }}
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
              {isLoading ? "Cargando..." : submitMessage}
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

export default FormUsuarios;
