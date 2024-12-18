/**
 * @file operadores.model.js
 * @module models/operadores.model
 * @description Modelo para interactuar con la tabla de operadores.
 * Importa QueryTypes de Sequelize y la configuracio  de Sequelize de la base de datos.
 * @requires sequelize
 * @requires QueryTypes
 */
import { QueryTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

/**
 * Inserta un nuevo operador.
 *
 * @async
 * @function insertar
 * @param {{ idUsuario: number, idEstado: number }} - Objeto con los datos del operador a insertar.
 * @returns {Promise<string|undefined>} El mensaje de respuesta del procedimiento almacenado.
 */
const insertar = async ({ idUsuario, idEstado } = {}) => {
  try {
    const resultado = await sequelize.query(
      `
        DECLARE @output_message nvarchar(255)
        EXEC sp_insertarOperador      @idUsuario= :idUsuario, 
                                      @idEstado= :idEstado, 
                                      @message=@output_message OUTPUT
        SELECT @output_message AS mensaje;
        `,
      {
        replacements: {
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
 * Actualiza un operador en la base de datos.
 *
 * @param {Object} params - Objeto con los datos para actualizar el operador.
 * @param {number} params.id - ID del operador a actualizar.
 * @param {number} [params.idUsuario=null] - ID del usuario asociado al operador.
 * @param {number} [params.idEstado=null] - ID del estado del operador.
 * @returns {Promise<string>} Mensaje de resultado de la operación.
 * @throws {Error} Si el ID no es proporcionado o si ocurre un error al ejecutar el procedimiento.
 */

const actualizar = async ({ id, idUsuario = null, idEstado = null } = {}) => {
  try {
    if (!id) {
      throw new Error("El id es obligatorio.");
    }

    const resultado = await sequelize.query(
      `
          DECLARE @output_message nvarchar(255)
          EXEC sp_actualizarOperador    @id= :id,
                                        @idUsuario= :idUsuario, 
                                        @idEstado= :idEstado, 
                                        @message=@output_message OUTPUT
          SELECT @output_message AS mensaje;
          `,
      {
        replacements: {
          id,
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
 * Obtiene todos los operadores de la base de datos.
 *
 * @returns {Promise<Object[]>} Un array de objetos con los datos de los operadores.
 * @throws {Error} Si ocurre un error al ejecutar el procedimiento.
 */
const obtenerTodo = async () => {
  try {
    const productos = await sequelize.query(
      `SELECT * FROM vw_ObtenerTodosOperadores WHERE ID_ESTADO = 1`,
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
 * Obtiene un operador por su ID.
 *
 * @param {number} ID ID del operador a obtener.
 * @returns {Promise<Object[]>} Array de objetos con los datos del operador.
 */
const obtenerTodoPorID = async (ID) => {
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
};

/**
 * Objeto que contiene los metodos para interactuar con la tabla de operadores.
 *
 * @typedef {Object} Operadores
 * @property {function} insertar Inserta un nuevo operador.
 * @property {function} actualizar Actualiza un operador.
 * @property {function} obtenerTodo Obtiene todos los operadores.
 * @property {function} obtenerTodoPorID Obtiene un operador por su ID.
 */
const operadores = {
  insertar,
  actualizar,
  obtenerTodo,
  obtenerTodoPorID,
};
export { operadores };
