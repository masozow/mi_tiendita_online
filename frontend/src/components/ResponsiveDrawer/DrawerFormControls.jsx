import React from "react";
import { Box } from "@mui/material";
import SelectCustom from "./SelectCustom";

const DrawerFormControls = ({ marca, categoria, handleSelectionChange }) => {
  return (
    <Box sx={{ p: 2 }}>
      <SelectCustom
        label="Marca"
        handleSelectionChange={(value) =>
          handleSelectionChange(value, "SET_MARCA")
        }
        id="marca"
        incomingStateValue={marca}
        queryKey="listMarcas"
        URL="/api/marcas/"
      />
      <SelectCustom
        label="Categoría"
        handleSelectionChange={(value) =>
          handleSelectionChange(value, "SET_CATEGORIA")
        }
        id="categoria"
        incomingStateValue={categoria}
        queryKey="listCategorias"
        URL="/api/categorias/"
      />
    </Box>
  );
};

export default DrawerFormControls;
