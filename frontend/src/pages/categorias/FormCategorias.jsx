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

const FormCategorias = ({ data, URL, httpMethod, submitMessage }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(data?.idEstado || 1);

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
    defaultValues: data || {
      nombre: "",
      idEstado: 1,
    },
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData, setIsLoading, dispatchSnackbar, mutateAsync, () => {
      setSelectedEstado(1);
      reset();
      if (data) {
        setTimeout(() => {
          navigate(-1);
        }, 1000);
      }
    });
  };

  const { mutateAsync } = useCustomMutation(URL, httpMethod);

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
        {submitMessage}
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
            {isLoading ? "Cargando..." : submitMessage}
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

export default FormCategorias;
