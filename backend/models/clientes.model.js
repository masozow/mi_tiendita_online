/**
 * @module models/clientes.model
 * @description Modelo de Clientes
 */
import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

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
const insertar = async ({
  razonSocial,
  nombre,
  direccion,
  idUsuario,
  idEstado,
} = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        DECLARE @output_id int
        EXEC sp_insertarCliente @razonSocial= :razonSocial, 
                                @nombre= :nombre,       
                                @direccion= :direccion,                                      
                                @idUsuario= :idUsuario,                                       
                                @idEstado= :idEstado,                                       
                                @message=@output_message OUTPUT,
                                @id= @output_id OUTPUT
      SELECT @output_message AS mensaje, @output_id as id;
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
    return resultado;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al ejecutar el procedimiento: " + err,
    });
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
  id,
  razonSocial = null,
  nombre = null,
  direccion = null,
  idUsuario = null,
  idEstado = null,
}) => {
  try {
    if (!id) {
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
          idCliente: id,
          razonSocial,
          nombre,
          direccion,
          idUsuario,
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    return resultado;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al ejecutar el procedimiento: " + err,
    });
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
      `SELECT * FROM vw_ObtenerTodosClientes WHERE ID_ESTADO = 1`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return productos;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al obtener la vista: " + err,
    });
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
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al obtener la vista: " + err,
    });
    throw err;
  }
};

const obtenerTodoPorIDUsuario = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodosClientes WHERE ID_USUARIO= :ID",
      {
        replacements: {
          ID,
        },
        type: QueryTypes.SELECT,
      }
    );
    return datos;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al obtener la vista: " + err,
    });
    throw err;
  }
};
/**
 * Objeto que contiene los metodos para interactuar con la tabla de clientes.
 *
 * @typedef {Object} Clientes
 * @property {function} insertar Inserta un nuevo cliente.
 * @property {function} actualizar Actualiza un cliente.
 * @property {function} obtenerTodo Obtiene todos los clientes.
 * @property {function} obtenerTodoPorID Obtiene un cliente por su ID.
 */
const clientes = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
  obtenerTodoPorIDUsuario,
};
export { clientes };
