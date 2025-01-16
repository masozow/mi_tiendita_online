import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import snackbarReducer from "../../store/snackBarReducer";
import { useCustomMutation } from "../../hooks/useLoginMutation";
import { yupResolver } from "@hookform/resolvers/yup";
import schemas from "../../utils/yupSchemas";
import onSubmit from "../../utils/onSubmit";
import getFieldErrorProps from "../../utils/getFieldErrorProps";
import SnackbarAlert from "../../components/Login/SnackBarAlert";
import { useNavigate } from "react-router-dom";

const FormEstados = ({ data, URL, httpMethod, submitMessage }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [usable, setUsable] = useState(data?.ACTIVO || true);

  const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
    open: false,
    message: "",
    severity: "success",
  });
  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.estadoSchema),
    mode: "onChange",
    defaultValues: data || {
      nombre: "",
      usable: true,
    },
  });

  const handleFormSubmit = (formData) => {
    onSubmit(formData, setIsLoading, dispatchSnackbar, mutateAsync, () => {
      setUsable(true);
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
                label="Nombre del Estado"
                variant="outlined"
                fullWidth
                {...getFieldErrorProps("nombre", errors)}
              />
            )}
          />

          <Controller
            name="usable"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.checked);
                      setUsable(e.target.checked);
                    }}
                  />
                }
                label="Estado Usable"
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

export default FormEstados;
