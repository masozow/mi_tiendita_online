import React from "react";
import TablaOrdenesAcciones from "../../components/TablaOrdenesAcciones";

const OrdenesPendientes = () => {
  return (
    <TablaOrdenesAcciones
      queryKey="todasOrdenes"
      queryURL="/api/ordenes/"
      mutateMethod="PUT"
      mutateURL={(ordenId) => `/api/ordenes/${ordenId}`}
      estadoYCondicionBoton={{ idEstado: 4, condicion: () => true }}
      etiquetaBoton="Confirmar"
      colorBoton="primary"
      tituloDialogo="Confirmar Orden"
      mensajeDialogo={(ordenId) => `¿Desea confirmar la orden ${ordenId}?`}
      navigateURL={(ordenId) => `/ordenes/${ordenId}`}
      tituloTabla="Órdenes Pendientes"
      funcionFiltro={(data) => data.filter((orden) => orden.ID_ESTADO === 3)}
    />
  );
};

export default OrdenesPendientes;
