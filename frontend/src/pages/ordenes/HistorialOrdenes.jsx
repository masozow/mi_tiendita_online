import React from "react";
import TablaOrdenesAcciones from "../../components/Ordenes/TablaOrdenesAcciones";

const HistorialOrdenes = () => {
  return (
    <TablaOrdenesAcciones
      queryKey="todasOrdenes"
      queryURL="/api/ordenes/"
      mutateMethod="PUT"
      mutateURL={(ordenId) => `/api/ordenes/${ordenId}`}
      estadoYCondicionBoton={{ idEstado: 7, condicion: () => true }}
      etiquetaBoton="Entregar"
      colorBoton="success"
      tituloDialogo="Entregar Orden"
      mensajeDialogo={(ordenId) => `¿Desea entregar la orden ${ordenId}?`}
      navigateURL={(ordenId) => `/ordenes/${ordenId}`}
      tituloTabla="Historial de Órdenes"
      funcionFiltro={(data) => data.filter((orden) => orden.ID_ESTADO === 4)}
    />
  );
};

export default HistorialOrdenes;
