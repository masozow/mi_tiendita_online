import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useReducer } from "react";
import snackbarReducer from "../../store/snackBarReducer";
import SnackbarAlert from "../../components/Login/SnackBarAlert";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const InputFileUpload = React.forwardRef(
  ({ onChange, value, ...props }, ref) => {
    const [snackbarState, dispatchSnackbar] = useReducer(snackbarReducer, {
      open: false,
      message: "",
      severity: "success",
    });

    const handleSnackbarClose = () => {
      dispatchSnackbar({ type: "CLOSE" });
    };

    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      const maxSizeInMB = 2;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      const allowedTypes = ["image/jpeg", "image/png"]; // Tipos permitidos

      for (const file of files) {
        // Validar el tamaño del archivo
        if (file.size > maxSizeInBytes) {
          dispatchSnackbar({
            type: "OPEN",
            message: `El archivo ${file.name} supera los ${maxSizeInMB}MB permitidos.`,
            severity: "error",
          });
          return;
        }

        // Validar el tipo de archivo
        if (!allowedTypes.includes(file.type)) {
          dispatchSnackbar({
            type: "OPEN",
            message: `El archivo ${file.name} no es un tipo válido. Solo se permiten JPEG o PNG.`,
            severity: "error",
          });
          return;
        }
      }

      // Si todos los archivos son válidos
      console.log("Archivos seleccionados:", files);
      dispatchSnackbar({
        type: "OPEN",
        message: "El archivo es válido.",
        severity: "success",
      });

      // Reenviar el evento al controlador externo
      if (onChange) {
        onChange(event); // Pasa el evento al componente padre
      }
    };

    return (
      <>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{ textTransform: "none" }}>
          Subir archivos
          <VisuallyHiddenInput
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/png" // Restringir tipos permitidos
            value={value ? undefined : ""} // Ensure value is always defined
            {...props}
          />
        </Button>
        <SnackbarAlert
          snackbarState={snackbarState}
          onClose={handleSnackbarClose}
        />
      </>
    );
  }
);

export default InputFileUpload;
