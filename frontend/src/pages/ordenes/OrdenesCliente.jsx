import TablaOrdenesAcciones from "../../components/Ordenes/TablaOrdenesAcciones";
import { useAuth } from "../../store/AuthContext";

const OrdenesCliente = () => {
  const { user } = useAuth();

  return (
    <TablaOrdenesAcciones
      queryKey={`Ordenes_${user?.ID}`}
      queryURL={`/api/ordenes/usuario/${user?.ID}`}
      mutateMethod="PATCH"
      mutateURL={(ordenId) => `/api/ordenes/cancel/${ordenId}`}
      estadoYCondicionBoton={{
        idEstado: 4,
        condicion: (estado) => estado !== 4 && estado !== 2 && estado !== 7,
      }}
      etiquetaBoton="Cancelar"
      colorBoton="error"
      tituloDialogo="Cancelar Orden"
      mensajeDialogo={(ordenId) => `¿Desea cancelar la orden ${ordenId}?`}
      navigateURL={(ordenId) => `/ordenes/${ordenId}`}
      tituloTabla={`Órdenes de ${user?.NOMBRE}`}
    />
  );
};

export default OrdenesCliente;
