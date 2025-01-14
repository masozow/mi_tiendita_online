import { useParams } from "react-router-dom";
import FormProductos from "./FormProductos";
import { useQueryHook } from "../../hooks/useQueryHook";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const ModificarProducto = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQueryHook(
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

  const dummyData = {
    codigoProducto: "12345",
    nombreProducto: "Producto de Prueba",
    stockProducto: 100,
    costoProducto: 50,
    precioProducto: 100,
    idCategoria: "1",
    idMarca: "1",
    idEstado: 1,
    fotoProducto: "iPhone.jpg",
  };

  return isLoading ? (
    <Typography>Cargando...</Typography>
  ) : error ? (
    <div>Error: {error.message}</div>
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
