/**
 * @module models/clientes.model
 * @description Modelo de Clientes
 */
import { QueryTypes } from "sequelize";
import sequelize from "./config/sequelize.js";

/**
 * Inserta un nuevo cliente en la base de datos.
 *
 * @param {string} razonSocial Razon Social del cliente.
 * @param {string} nombre Nombre del cliente.
 * @param {string} direccion Dirección del cliente.
 * @param {number} idUsuario ID del usuario que realizó el registro.
 * @param {number} idEstado ID del estado en el que se encuentra el cliente.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async (
  razonSocial,
  nombre,
  direccion,
  idUsuario,
  idEstado
) => {
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
  }
};

/**
 * Actualiza un cliente en la base de datos.
 *
 * @param {number} idCliente ID del cliente a actualizar.
 * @param {string} [razonSocial] Razón Social del cliente.
 * @param {string} [nombre] Nombre del cliente.
 * @param {string} [direccion] Dirección del cliente.
 * @param {number} [idUsuario] ID del usuario que realizó el registro.
 * @param {number} [idEstado] ID del estado en el que se encuentra el cliente.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({
  idCliente,
  razonSocial = null,
  nombre = null,
  direccion = null,
  idUsuario = null,
  idEstado = null,
}) => {
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
  }
};

/**
 * Obtiene todos los clientes de la base de datos.
 *
 * @returns {Promise<Array<any>>} Un array de objetos con los datos de los clientes.
 */
const obtenerTodo = async () => {
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
  }
};

/**
 * Obtiene todos los datos de un cliente en particular.
 *
 * @param {number} ID ID del cliente.
 * @returns {Promise<Array<any>>} Un array de objetos con los datos del cliente.
 */
const obtenerTodoPorID = async (ID) => {
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
};

const clientes = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
};
export { clientes };
