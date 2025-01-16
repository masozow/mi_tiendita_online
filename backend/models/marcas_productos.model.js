/**
 * @module models/marcas_productos.model
 * @description Modelo para interactuar con la tabla de marcas de productos.
 */

import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";
import { errorAndLogHandler, errorLevels } from "../utilities/errorHandler.js";

/**
 * Inserta una nueva marca en la base de datos.
 *
 * @param {Object} params Parámetros para insertar una nueva marca.
 * @param {string} params.nombre Nombre de la marca a insertar.
 * @param {number} params.idEstado ID del estado de la marca.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const insertar = async ({ nombre, idEstado } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
      DECLARE @output_message nvarchar(255)
      DECLARE @output_id int
      EXEC sp_insertarMarca @nombre= :nombre, 
                            @idEstado= :idEstado, 
                            @message=@output_message OUTPUT,
                            @id= @output_id OUTPUT
      SELECT @output_message AS mensaje, @output_id as id;
      `,
      {
        replacements: {
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
 * Actualiza una marca en la base de datos.
 *
 * @param {Object} params Parámetros para actualizar la marca.
 * @param {number} params.id ID de la marca a actualizar.
 * @param {string} [params.nombre=null] Nuevo nombre de la marca.
 * @param {number} [params.idEstado=null] Nuevo ID del estado de la marca.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 */
const actualizar = async ({ id, nombre = null, idEstado = null } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_actualizarMarca @id= :id,
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
    const mensaje = resultado;
    return mensaje;
  } catch (err) {
    errorAndLogHandler({
      level: errorLevels.error,
      message: "Error al ejecutar el procedimiento: " + err,
    });
    throw err;
  }
};

/**
 * Obtiene todas las marcas en la base de datos.
 *
 * @param {number} [idEstado=1] ID del estado de las marcas a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos de las marcas.
 */
const obtenerTodo = async (idEstado = 1) => {
  try {
    let datos;
    if (idEstado == 0) {
      datos = await sequelize.query(
        "SELECT * FROM vw_ObtenerTodasMarcas  ORDER BY NOMBRE",
        {
          type: QueryTypes.SELECT,
        }
      );
    } else {
      datos = await sequelize.query(
        "SELECT * FROM vw_ObtenerTodasMarcas WHERE ID_ESTADO = :idEstado ORDER BY NOMBRE",
        {
          replacements: {
            idEstado,
          },
          type: QueryTypes.SELECT,
        }
      );
    }
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
 * Obtiene una marca en particular por su ID.
 *
 * @param {number} ID ID de la marca a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos de la marca.
 */
const obtenerTodoPorID = async (ID) => {
  try {
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasMarcas WHERE ID= :ID",
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
 * Objeto que contiene los metodos para interactuar con la tabla de marcas de productos.
 *
 * @typedef {Object} Marcas
 * @property {function} insertar Inserta una nueva marca de productos.
 * @property {function} actualizar Actualiza una marca de productos.
 * @property {function} obtenerTodo Obtiene todas las marcas de productos.
 * @property {function} obtenerTodoPorID Obtiene una marca de productos por su ID.
 */
const marcas = { insertar, actualizar, obtenerTodo, obtenerTodoPorID };

export { marcas };
