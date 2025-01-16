import React from "react";
import TablaOrdenesAcciones from "../../components/Ordenes/TablaOrdenesAcciones";

const TodasOrdenes = () => {
  return (
    <TablaOrdenesAcciones
      queryKey="todasOrdenes"
      queryURL="/api/ordenes/"
      mutateMethod="PATCH"
      mutateURL={(ordenId) => `/api/ordenes/cancel/${ordenId}`}
      estadoYCondicionBoton={{
        idEstado: 4,
        condicion: (estado) => estado !== 4 && estado !== 2 && estado !== 7,
      }}
      etiquetaBoton="Eliminar"
      colorBoton="error"
      tituloDialogo="Eliminar Orden"
      mensajeDialogo={(ordenId) => `¿Desea eliminar la orden ${ordenId}?`}
      navigateURL={(ordenId) => `/ordenes/${ordenId}`}
      tituloTabla="Órdenes"
    />
  );
};

export default TodasOrdenes;
