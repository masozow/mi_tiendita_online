/**
 * @module models/marcas_productos.model
 * @description Modelo para interactuar con la tabla de marcas de productos.
 */

import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

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
      EXEC sp_insertarMarca @nombre= :nombre, 
                            @idEstado= :idEstado, 
                            @message=@output_message OUTPUT
      SELECT @output_message AS mensaje;
      `,
      {
        replacements: {
          nombre,
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
    const mensaje = resultado[0]?.mensaje;
    return mensaje;
  } catch (err) {
    console.error("Error al ejecutar el procedimiento:", err);
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
    const datos = await sequelize.query(
      "SELECT * FROM vw_ObtenerTodasMarcas WHERE ID_ESTADO = :idEstado",
      {
        replacements: {
          idEstado,
        },
        type: QueryTypes.SELECT,
      }
    );
    console.log("Datos obtenidos de la vista:", datos);
    return datos;
  } catch (err) {
    console.error("Error al consultar la vista:", err);
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
    console.error("Error al consultar la vista:", err);
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
