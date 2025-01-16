import { useParams } from "react-router-dom";
import FormProductos from "./FormProductos";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import SkeletonComponent from "../../components/SkeletonComponent";
import ErrorComponent from "../../components/ErrorComponent";

const ModificarProducto = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useQueryHook(
    `ObtenerProducto_${id}`,
    `/api/productos/${id}`
  );
  const [producto, setProducto] = useState({
    codigoProducto: "",
    nombreProducto: "",
    stockProducto: 0.0,
    costoProducto: 0.0,
    precioProducto: 0.0,
    idCategoria: 0,
    idMarca: 0,
    idEstado: 0,
    fotoProducto: null,
  });

  useEffect(() => {
    if (data?.data && data?.data.length > 0) {
      setProducto({
        codigoProducto: data?.data[0].CODIGO,
        nombreProducto: data?.data[0].NOMBRE,
        stockProducto: data?.data[0].STOCK,
        costoProducto: data?.data[0].COSTO,
        precioProducto: data?.data[0].PRECIO,
        idCategoria: data?.data[0].ID_CATEGORIA,
        idMarca: data?.data[0].ID_MARCA,
        idEstado: data?.data[0].ID_ESTADO,
        fotoProducto: data?.data[0].FOTO,
      });
    }
  }, [data]);

  return isLoading ? (
    <SkeletonComponent />
  ) : error ? (
    <ErrorComponent error={error} />
  ) : (
    <>
      {producto.codigoProducto && (
        <FormProductos
          data={producto}
          URL={`/api/productos/${id}`}
          httpMethod="PUT"
          submitMessage="Modificar Producto"
        />
      )}
    </>
  );
};

export default ModificarProducto;
