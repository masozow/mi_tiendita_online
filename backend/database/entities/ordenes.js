import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

async function insertar(
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
) {
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
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
}

async function actualizar({
  idOperador,
  idUsuario = null,
  idEstado = null,
} = {}) {
  try {
    if (!idOperador) {
      throw new Error("El id es obligatorio.");
    }

    const resultado = await sequelize.query(
      `
          DECLARE @output_message nvarchar(255)
          EXEC sp_actualizarOperador    @id= :idOperador,
                                        @idUsuario= :idUsuario, 
                                        @idEstado= :idEstado, 
                                        @message=@output_message OUTPUT
          SELECT @output_message AS mensaje;
          `,
      {
        replacements: {
          idOperador,
          idUsuario,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
}

async function obtenerTodo() {
  try {
    const productos = await sequelize.query(
      `SELECT * FROM vw_ObtenerTodosOperadores`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return productos;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
    throw err;
  } finally {
    await sequelize.close();
    console.log("Conexión cerrada.");
  }
}

async function obtenerTodoPorID(ID) {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodosOperadores WHERE ID= :ID",
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
}

const ordenes = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
};
export { ordenes };
