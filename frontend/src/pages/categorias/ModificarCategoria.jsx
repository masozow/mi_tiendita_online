import { useParams } from "react-router-dom";
import FormCategorias from "./FormCategorias";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

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
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
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
