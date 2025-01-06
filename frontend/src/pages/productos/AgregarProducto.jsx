import {
  Box,
  Button,
  Container,
  Input,
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
import InputFileUpload from "../../components/Productos/InputFileUpload";

const AgregarProducto = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useCustomMutation("/api/productos", "POST");
  const [imagePreview, setImagePreview] = useState(null);

  const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
    open: false,
    message: "",
    severity: "success",
  });
  const handleSnackbarClose = () => {
    dispatchSnackbar({ type: "CLOSE" });
  };

  const theme = useTheme();
  const { isSmallScreen } = breakPointsFromTheme(theme);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemas.productoSchema),
    mode: "onChange",
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el primer archivo
    console.log("Archivo recibido en handleImageChange:", file);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log("Contenido leído por FileReader:", reader.result);
        setImagePreview(reader.result); // Actualizar el estado con la vista previa
      };

      reader.onerror = (error) => {
        console.error("Error al leer el archivo:", error);
      };

      reader.readAsDataURL(file); // Leer el archivo como una URL base64
    } else {
      console.warn("No se seleccionó ningún archivo.");
    }
  };

  const handleFormSubmit = (formData) => {
    // Aquí puedes acceder al archivo subido desde `formData.fotoProducto`
    console.log("Archivo subido: ", formData.fotoProducto);
    console.log("Datos del formulario: ", formData);
  };
  useEffect(() => {
    console.log("imagePreview: ", imagePreview);
  }, [imagePreview]);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: "1rem", md: "2rem" },
        flexGrow: 1,
        flexShrink: 0,
        minWidth: "100%",
      }}>
      <Typography variant="h5" sx={{ mb: "1rem" }}>
        Crear nuevo producto
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Stack spacing={2} width="100%">
          <Controller
            name="nombreProducto"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre del Producto"
                variant="outlined"
                fullWidth
                {...getFieldErrorProps("nombreProducto", errors)}
              />
            )}
          />
          <Controller
            name="fotoProducto"
            control={control}
            defaultValue={null} // Default value para el archivo
            render={({ field }) => (
              <InputFileUpload
                {...field}
                onChange={(event) => {
                  console.log("Evento onChange disparado:", event.target.files);
                  // const files = event.target.files;
                  // field.onChange(event.target.files[0]);
                  handleImageChange(event);
                }}
              />
            )}
          />
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Vista previa"
                style={{ maxWidth: "15rem", height: "auto" }}
              />
            </Box>
          )}
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

export default AgregarProducto;
