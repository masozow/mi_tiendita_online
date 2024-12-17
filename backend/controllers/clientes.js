import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";

async function insertar(razonSocial, nombre, direccion, idUsuario, idEstado) {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_insertarCliente      @razonSocial= :razonSocial, 
                                      @nombre= :nombre, 
                                      @direccion= :direccion, 
                                      @idUsuario= :idUsuario, 
                                      @idEstado= :idEstado, 
                                      @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          razonSocial,
          nombre,
          direccion,
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

async function actualizar({
  idCliente,
  razonSocial = null,
  nombre = null,
  direccion = null,
  idUsuario = null,
  idEstado = null,
} = {}) {
  try {
    if (!idCliente) {
      throw new Error("El id es obligatorio.");
    }

    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarCliente   @id= :idCliente,  
                                    @razonSocial= :razonSocial, 
                                    @nombre= :nombre, 
                                    @direccion= :direccion, 
                                    @idUsuario= :idUsuario, 
                                    @idEstado= :idEstado, 
                                    @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          idCliente,
          razonSocial,
          nombre,
          direccion,
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
      `SELECT * FROM vw_ObtenerTodosClientes`,
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
      "SELECT * FROM vw_ObtenerTodosClientes WHERE ID= :ID",
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

const clientes = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
};
export { clientes };
