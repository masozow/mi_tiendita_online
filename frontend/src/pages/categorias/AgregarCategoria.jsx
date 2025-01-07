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

const AgregarCategoria = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useCustomMutation("/api/categorias", "POST");
  const [selectedEstado, setSelectedEstado] = useState(1);

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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.categoriaSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      idEstado: 1,
    },
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData, setIsLoading, dispatchSnackbar, mutateAsync, () => {
      console.log("Categoria data: ", formData);
      setSelectedEstado(1);
      reset();
    });
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
      <Typography variant="h5" sx={{ mb: "1rem" }} align="center">
        Crear nueva categoría
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Stack spacing={2} width="100%" direction="column">
          <Controller
            name="nombre"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                label="Nombre de la Categoría"
                variant="outlined"
                fullWidth
                {...getFieldErrorProps("nombre", errors)}
              />
            )}
          />

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}>
            {isLoading ? "Cargando..." : "Crear Categoría"}
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

export default AgregarCategoria;
