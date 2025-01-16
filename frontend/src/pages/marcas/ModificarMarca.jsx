import { useParams } from "react-router-dom";
import FormMarcas from "./FormMarcas";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const ModificarMarca = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQueryHook(
    `ObtenerMarca_${id}`,
    `/api/marcas/${id}`
  );
  const [marca, setMarca] = useState({
    nombre: "",
    idEstado: 1,
  });

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      const marcaData = data.data[0];
      setMarca({
        nombre: marcaData.NOMBRE,
        idEstado: marcaData.ID_ESTADO,
      });
    }
  }, [data]);

  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <>
      {marca.nombre && (
        <FormMarcas
          data={marca}
          URL={`/api/marcas/${id}`}
          httpMethod="PUT"
          submitMessage="Modificar Marca"
        />
      )}
    </>
  );
};

export default ModificarMarca;
