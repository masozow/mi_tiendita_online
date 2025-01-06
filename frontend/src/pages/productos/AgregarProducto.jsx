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
import InputFileUpload from "../../components/Productos/InputFileUpload";
import handleImageChange from "../../utils/showUploadedImage";
import SelectCustomControlled from "../../components/ResponsiveDrawer/SelectCustomControlled"; // Updated import statement

const AgregarProducto = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useCustomMutation("/api/productos", "POST");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedMarca, setSelectedMarca] = useState(""); // State for selected marca
  const [selectedCategoria, setSelectedCategoria] = useState(""); // State for selected categoria
  const [selectedEstado, setSelectedEstado] = useState(1); // State for selected estado, default to 1

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
    resolver: yupResolver(schemas.productoSchema),
    mode: "onChange",
    defaultValues: {
      codigoProducto: "",
      nombreProducto: "",
      stockProducto: 0.0,
      costoProducto: 0.0,
      precioProducto: 0.0,
      idCategoria: "",
      idMarca: "",
      idEstado: 1, // Default value for idEstado
      fotoProducto: null, // Default value for fotoProducto
    },
  });

  const handleFormSubmit = (formData) => {
    const formDataToSend = new FormData();
    formDataToSend.append("codigoProducto", formData.codigoProducto);
    formDataToSend.append("nombreProducto", formData.nombreProducto);
    formDataToSend.append("stockProducto", formData.stockProducto);
    formDataToSend.append("costoProducto", formData.costoProducto);
    formDataToSend.append("precioProducto", formData.precioProducto);
    formDataToSend.append("idCategoria", formData.idCategoria);
    formDataToSend.append("idMarca", formData.idMarca);
    formDataToSend.append("idEstado", formData.idEstado);
    if (formData.fotoProducto) {
      formDataToSend.append("fotoProducto", formData.fotoProducto);
    }

    onSubmit(
      formDataToSend,
      setIsLoading,
      dispatchSnackbar,
      mutateAsync,
      () => {
        console.log("Producto data: ", formData);
        reset();
      }
    );
  };

  useEffect(() => {
    console.log("imagePreview: ", imagePreview);
  }, [imagePreview]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        px: { xs: "1rem", md: "2rem" },
        py: 0,
        my: 0,
        minWidth: "100%",
      }}>
      <Typography variant="h5" sx={{ mb: "1rem" }} align="center">
        Crear nuevo producto
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Stack spacing={2} width="100%" direction={"column"}>
          <Stack spacing={2} width="33%">
            <Controller
              name="codigoProducto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  autoFocus
                  label="Código del Producto"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("codigoProducto", errors)}
                />
              )}
            />
          </Stack>
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
          </Stack>
          <Stack
            spacing={2}
            width="100%"
            direction={isSmallScreen ? "column" : "row"}>
            <Controller
              name="stockProducto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stock del Producto"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("stockProducto", errors)}
                />
              )}
            />
            <Controller
              name="costoProducto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Costo del Producto"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("costoProducto", errors)}
                />
              )}
            />
            <Controller
              name="precioProducto"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Precio del Producto"
                  type="number"
                  variant="outlined"
                  fullWidth
                  {...getFieldErrorProps("precioProducto", errors)}
                />
              )}
            />
          </Stack>
          <Stack
            spacing={2}
            width="100%"
            direction={isSmallScreen ? "column" : "row"}>
            <Controller
              name="idMarca"
              control={control}
              render={({ field }) => (
                <SelectCustomControlled
                  {...field}
                  label="Marca"
                  handleSelectionChange={(value) => {
                    setSelectedMarca(value);
                    field.onChange(value);
                  }}
                  id="marca"
                  incomingStateValue={selectedMarca}
                  queryKey="listMarcas"
                  URL="/api/marcas/"
                  errors={errors}
                  fieldName="idMarca"
                />
              )}
            />
            <Controller
              name="idCategoria"
              control={control}
              render={({ field }) => (
                <SelectCustomControlled
                  {...field}
                  label="Categoría"
                  handleSelectionChange={(value) => {
                    setSelectedCategoria(value);
                    field.onChange(value);
                  }}
                  id="categoria"
                  incomingStateValue={selectedCategoria}
                  queryKey="listCategorias"
                  URL="/api/categorias/"
                  errors={errors}
                  fieldName="idCategoria"
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
          </Stack>
          <Stack
            spacing={2}
            width="100%"
            direction={isSmallScreen ? "column" : "row"}
            alignItems={"right"}
            alignContent={"right"}
            alignSelf={"right"}>
            <Stack
              spacing={2}
              width="100%"
              alignSelf={"right"}
              direction={"row"}>
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  style={{ maxWidth: "15rem", height: "auto" }}
                  border="1px solid black"
                  borderRadius="5px"
                />
              </Box>
              <Controller
                name="fotoProducto"
                control={control}
                render={({ field }) => (
                  <InputFileUpload
                    {...field}
                    onChange={(event) => {
                      console.log(
                        "Evento onChange disparado:",
                        event.target.files
                      );
                      field.onChange(event.target.files[0]); // Update the form state with the selected file
                      handleImageChange(event, setImagePreview);
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
              {isLoading ? "Cargando..." : "Crear Producto"}
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

export default AgregarProducto;
