import { useParams } from "react-router-dom";
import FormCategorias from "./FormCategorias";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const ModificarCategoria = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQueryHook(
    `ObtenerCategoria_${id}`,
    `/api/categorias/${id}`
  );
  const [categoria, setCategoria] = useState({
    nombre: "",
    idEstado: 1,
  });

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      const categoriaData = data.data[0];
      setCategoria({
        nombre: categoriaData.NOMBRE,
        idEstado: categoriaData.ESTADO,
      });
    }
  }, [data]);

  return isLoading ? (
    <Typography>Cargando...</Typography>
  ) : error ? (
    <div>Error: {error.message}</div>
  ) : (
    <>
      {categoria.nombre && (
        <FormCategorias
          data={categoria}
          URL={`/api/categorias/${id}`}
          httpMethod="PUT"
          submitMessage="Modificar Categoría"
        />
      )}
    </>
  );
};

export default ModificarCategoria;
