import { useParams } from "react-router-dom";
import FormEstados from "./FormEstados";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const ModificarEstado = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQueryHook(
    `ObtenerEstado_${id}`,
    `/api/estados/${id}`
  );
  const [estado, setEstado] = useState({
    nombre: "",
    usable: true,
  });

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      const estadoData = data.data[0];
      setEstado({
        nombre: estadoData.NOMBRE,
        usable: estadoData.ACTIVO,
      });
    }
  }, [data]);

  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <>
      {estado.nombre && (
        <FormEstados
          data={estado}
          URL={`/api/estados/${id}`}
          httpMethod="PUT"
          submitMessage="Modificar Estado"
        />
      )}
    </>
  );
};

export default ModificarEstado;
