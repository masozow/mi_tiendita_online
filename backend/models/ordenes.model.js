import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const insertar = async (
  nombre,
  direccion,
  telefono,
  correo,
  fechaEntrega,
  total,
  idEstado,
  idCliente,
  idOperador,
  detalle
) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_insertarOrdenConDetalles    @nombre= :nombre,
                                            @direccion= :direccion,
                                            @telefono= :telefono,
                                            @correo= :correo,
                                            @fechaEntrega= :fechaEntrega,
                                            @total= :total,
                                            @idEstado= :idEstado, 
                                            @idCliente= :idCliente, 
                                            @idOperador= :idOperador, 
                                            @detalleJson= :detalle,
                                            @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          nombre,
          direccion,
          telefono,
          correo,
          fechaEntrega,
          total,
          idEstado,
          idCliente,
          idOperador,
          detalle,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

const actualizar = async ({
  idOrden,
  nombre = null,
  direccion = null,
  telefono = null,
  correo = null,
  fechaEntrega = null,
  total = null,
  idEstado = null,
  idCliente = null,
  idOperador = null,
} = {}) => {
  try {
    if (!idOrden) {
      throw new Error("El id es obligatorio.");
    }
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarOrden @id= :idOrden,
                                @nombre= :nombre,
                                @direccion= :direccion,
                                @telefono= :telefono,          
                                @correo= :correo,            
                                @fechaEntrega= :fechaEntrega,            
                                @total= :total,
                                @idEstado= :idEstado, 
                                @idCliente= :idCliente, 
                                @idOperador= :idOperador, 
                                @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          idOrden,
          nombre,
          direccion,
          telefono,
          correo,
          fechaEntrega,
          total,
          idEstado,
          idCliente,
          idOperador,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

const obtenerTodo = async () => {
  try {
    const productos = await sequelize.query(
      `SELECT * FROM vw_ObtenerTodasOrdenes`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return productos;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  }
};

const obtenerOrdenPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasOrdenes WHERE idOrden= :ID",
      {
        replacements: {
          ID,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};

const obtenerDetallePorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodoOrdenDetalle WHERE Orden_idOrden= :ID",
      {
        replacements: {
          ID,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
  }
};

const ordenes = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerOrdenPorID,
  obtenerDetallePorID,
};

export { ordenes };
