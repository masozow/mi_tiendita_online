/**
 * @file roles.model.js
 * @module  models/marcas_productos.model
 * @description Modelo para interactuar con la tabla de roles.
 * @requires sequelize
 * @requires QueryTypes
 */
import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Inserta un nuevo rol en la base de datos.
 *
 * @param {Object} params Parámetros para insertar un nuevo rol.
 * @param {string} params.nombre Nombre del rol a insertar.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async ({ nombre } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      EXEC sp_insertarRol @nombre= :nombre, 
                          @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
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
 * Actualiza un rol en la base de datos.
 *
 * @param {Object} params Parámetros para actualizar el rol.
 * @param {number} params.id ID del rol a actualizar.
 * @param {string} [params.nombre=null] Nuevo nombre del rol.
 * @param {number} [params.idEstado=null] Nuevo ID del estado del rol.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({ id, nombre = null, idEstado = null } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarRol @id= :id,
                              @nombre= :nombre, 
                              @idEstado= :idEstado, 
                              @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
          id,
          nombre,
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
 * Obtiene todos los roles en la base de datos.
 *
 * @param {number} [idEstado=1] ID del estado de los roles a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos de los roles.
 */
const obtenerTodo = async (idEstado = 1) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosRoles WHERE ID_ESTADO = :idEstado",
      {
        replacements: {
          idEstado,
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
 * Obtiene un rol en particular por su ID.
 *
 * @param {number} ID ID del rol a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos del rol.
 */
const obtenerTodoPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_obtenerTodosRoles WHERE ID= :ID",
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
 * Objeto que contiene los métodos para interactuar con la tabla de roles.
 *
 * @typedef {Object} Roles
 * @property {function} insertar Inserta un nuevo rol.
 * @property {function} actualizar Actualiza un rol existente.
 * @property {function} obtenerTodo Obtiene todos los roles.
 * @property {function} obtenerTodoPorID Obtiene un rol en particular por su ID.
 */
const roles = { insertar, actualizar, obtenerTodo, obtenerTodoPorID };
export { roles };
