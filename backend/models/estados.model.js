/**
 * @file estados.model.js
 * @module sequelizeConfig
 * @description Configuración de la conexión a la base de datos utilizando Sequelize.
 */

import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";
/**
 * Inserta un nuevo estado en la base de datos.
 *
 * @param {Object} params Parámetros para insertar un nuevo estado.
 * @param {string} params.nombre Nombre del estado a insertar.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async ({ nombre } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        DECLARE @output_id int
        EXECUTE dbo.sp_insertarEstado @nombre= :nombre, 
                                      @message=@output_message OUTPUT,
                                      @id= @output_id OUTPUT
        SELECT @output_message AS mensaje, @output_id as id;
        `,
      {
        replacements: {
          nombre,
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
 * Actualiza un estado en la base de datos.
 *
 * @param {Object} params Objeto con los datos para actualizar el estado.
 * @param {number} params.id ID del estado a actualizar.
 * @param {string} [params.nombre=null] Nuevo nombre del estado.
 * @param {boolean} [params.usable=null] Indica si el estado es usable.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({ id, nombre = null, usable = null } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXECUTE dbo.sp_actualizarEstado @id= :id, 
                                        @nombre= :nombre, 
                                        @usable= :usable, 
                                        @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          id,
          nombre,
          usable,
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
 * Obtiene todos los estados en la base de datos.
 *
 * @returns {Promise<Object[]>} Array de objetos con los datos de los estados.
 */
const obtenerTodo = async () => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosEstados where ACTIVO=1",
      {
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
 * Obtiene un estado en particular por su ID.
 *
 * @param {number} ID ID del estado a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos del estado.
 */
const obtenerTodoPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosEstados WHERE ID= :ID",
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
 * @typedef {Object} Estados
 * @property {function} insertar Inserta un nuevo estado en la base de datos.
 * @property {function} actualizar Actualiza un estado en la base de datos.
 * @property {function} obtenerTodo Obtiene todos los estados en la base de datos.
 * @property {function} obtenerTodoPorID Obtiene un estado en particular por su ID.
 */
const estados = { insertar, actualizar, obtenerTodo, obtenerTodoPorID };
/**
 * Exporta el objeto con los métodos para interactuar con la tabla de estados.
 * @type {Estados}
 */
export { estados };
