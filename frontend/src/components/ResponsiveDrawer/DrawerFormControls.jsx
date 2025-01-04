import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useQueryHook } from "../../hooks/useQueryHook";

const DrawerFormControls = ({ marca, categoria, handleSelectionChange }) => {
  const {
    data: dataMarcas,
    isLoading: isLoadingMarcas,
    error: errorMarcas,
  } = useQueryHook("listMarcas", "/api/marcas/");

  const {
    data: dataCategorias,
    isLoading: isLoadingCategorias,
    error: errorCategorias,
  } = useQueryHook("listCategorias", "/api/categorias/");

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="marca-label">Marca</InputLabel>
        <Select
          labelId="marca-label"
          id="marca-select"
          value={marca}
          label="Marca"
          onChange={(event) =>
            handleSelectionChange("marca", event.target.value)
          }>
          <MenuItem value={0}>
            <em>--Ninguna--</em>
          </MenuItem>
          {isLoadingMarcas ? (
            <MenuItem value="">
              <em>Cargando...</em>
            </MenuItem>
          ) : (
            dataMarcas.data?.map((marca) => (
              <MenuItem key={marca.ID} value={marca.ID}>
                {marca.NOMBRE}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="categoria-label">Categoría</InputLabel>
        <Select
          labelId="categoria-label"
          id="categoria-select"
          value={categoria}
          label="Categoría"
          onChange={(event) =>
            handleSelectionChange("categoria", event.target.value)
          }>
          <MenuItem value={0}>
            <em>--Ninguna--</em>
          </MenuItem>
          {isLoadingCategorias ? (
            <MenuItem value="">
              <em>Cargando...</em>
            </MenuItem>
          ) : (
            dataCategorias.data?.map((categoria) => (
              <MenuItem key={categoria.ID} value={categoria.ID}>
                {categoria.NOMBRE}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DrawerFormControls;
