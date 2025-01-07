import { useEffect, useState } from "react";
import { useQueryHook } from "../../hooks/useQueryHook";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../store/AuthContext";
import { breakPointsFromTheme } from "../../utils/breakPointFunctions";
import Dialogo from "../../components/Dialogo/Dialogo";
import CustomChip from "../../components/CustomChip";

const TodasMarcas = () => {
  const [filas, setFilas] = useState([]);
  const { user } = useAuth();
  const theme = useTheme();
  const { isSmallScreen, isMediumScreen, isLargeScreen } =
    breakPointsFromTheme(theme);

  const { data, isLoading, error } = useQueryHook(
    "todasMarcas",
    "/api/marcas/"
  );

  useEffect(() => {
    if (data?.data) {
      setFilas(data.data);
    }
  }, [data]);

  if (isLoading) return <Typography>Cargando...</Typography>;
  if (error) return <div>Error: {error.message}</div>;

  const handleEdit = (marcaId) => {
    console.log("Edit marca with ID:", marcaId);
  };

  const handleDelete = (marcaId) => {
    console.log("Delete marca with ID:", marcaId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="tabla de marcas">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Marcas
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Nombre</b>
            </TableCell>
            <TableCell align="center">
              <b>Estado</b>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filas.map((fila) => (
            <TableRow key={fila.ID}>
              <TableCell>{fila.ID}</TableCell>
              <TableCell>{fila.NOMBRE}</TableCell>
              <TableCell align="center">
                <CustomChip incomingLabel={fila.ID_ESTADO} />
              </TableCell>
              <TableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEdit(fila.ID)}>
                  <EditIcon />
                </IconButton>
                <Dialogo
                  onConfirm={() => handleDelete(fila.ID)}
                  triggerButton={
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                  titulo="Eliminar marca"
                  mensaje={`¿Desea eliminar la marca ${fila.NOMBRE}?`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodasMarcas;
